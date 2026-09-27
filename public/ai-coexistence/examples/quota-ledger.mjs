/** This SQL primitive is used by the local forum's SQLite store.
 * Invoke it inside the SAME transaction as the content insert or delete.
 * The quota counts active authored content, not backup/database overhead.
 */
export const QUOTA = 20_000_000; // Exactly 20 decimal MB per account.
export function reserveQuota(db, accountId, deltaBytes) {
  if (!Number.isSafeInteger(deltaBytes)) throw new TypeError('Invalid byte count');
  const result = db.prepare(`
    UPDATE users SET used = used + ?
    WHERE id = ? AND used + ? BETWEEN 0 AND ?
  `).run(deltaBytes, accountId, deltaBytes, QUOTA);
  if (result.changes !== 1) {
    const error = new Error('Your total storage limit is 20 MB.');
    error.status = 413;
    throw error;
  }
}
// BEGIN IMMEDIATE -> reserveQuota -> write content -> COMMIT.
// If any step fails: ROLLBACK both the content and the quota adjustment.
// For deletion: remove active content and return its recorded byte charge.
// Authentication, ownership and input validation happen before this primitive.
