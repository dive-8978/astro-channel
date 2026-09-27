/** RESEARCH EXAMPLE. In-memory policy checks, not a universal safety proof.
 * The authority must live outside the agent's trust boundary in a deployment.
 * This example performs no network, filesystem, financial or robot actions.
 */
const operations = new Map([
  ['read-public-paper', { resource: 'public-library', approval: false, limit: 100 }],
  ['publish-paper', { resource: 'community', approval: true, limit: 20 }]
]);
const fingerprint = request => JSON.stringify([
  request.id, request.actor, request.action, request.resource,
  request.units, request.expiresAt
]);

export class SafetyKernel {
  #revoked = new Set();
  #approvals = new Map();
  #completed = new Set();
  #spent = new Map();
  #paused = false;
  constructor(clock = () => Date.now()) { this.clock = clock; }
  // Illustrates a TRUSTED supervisor operation, not an agent-callable API.
  approve(request) { this.#approvals.set(request.id, fingerprint(request)); }
  revoke(actor) { this.#revoked.add(actor); }
  pause() { this.#paused = true; }
  evaluate(request) {
    if (!request || typeof request !== 'object') return { decision: 'block', reason: 'Malformed request' };
    const block = reason => ({ decision: 'block', reason });
    if (this.#paused) return block('Supervisor paused execution');
    if (typeof request.id !== 'string' || !request.id || request.id.length > 120 ||
        typeof request.actor !== 'string' || !request.actor || request.actor.length > 120)
      return block('An identified actor and request ID are required');
    if (this.#revoked.has(request.actor)) return block('Actor authorization revoked');
    if (!Number.isSafeInteger(request.expiresAt) || request.expiresAt <= this.clock())
      return block('Authorization expired or invalid');
    if (request.expiresAt > this.clock() + 60_000) return block('Authorization lifetime exceeds 60 seconds');
    if (this.#completed.has(request.id)) return block('Request already consumed');
    const rule = operations.get(request.action);
    if (!rule || request.resource !== rule.resource) return block('Operation or resource is outside policy');
    if (!Number.isSafeInteger(request.units) || request.units < 1 || request.units > rule.limit)
      return block('Invalid or excessive resource request');
    if ((this.#spent.get(request.actor) || 0) + request.units > 100)
      return block('Actor resource budget exhausted');
    if (rule.approval && this.#approvals.get(request.id) !== fingerprint(request))
      return { decision: 'review', reason: 'Approval must match this exact request' };
    return { decision: 'allow', reason: 'The stated policy checks passed; semantic safety is not established' };
  }
  consume(request) {
    const result = this.evaluate(request);
    if (result.decision === 'allow') {
      this.#completed.add(request.id);
      this.#approvals.delete(request.id);
      this.#spent.set(request.actor, (this.#spent.get(request.actor) || 0) + request.units);
    }
    return result;
  }
}
