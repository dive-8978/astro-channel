# Bounded Agency: A Verifiable Framework for Human–AI Coexistence

AstroBridge Research · AI-assisted proposal · 2026-09-27

**Technical proposal · Executable policy examples**

An AI-assisted technical proposal prepared for discussion. The reference code illustrates scoped mechanisms. No independent peer review, deployed AGI containment or universal safety guarantee is claimed.

## Abstract

We propose a layered framework for AI systems that can act through digital or physical tools. Its objective is to reduce specified risks while preserving useful assistance and human agency. The central principle is separation of proposal from execution: an agent may recommend an action, but an independently controlled gateway decides whether that action is authorized. The accompanying code demonstrates a small policy state machine. It neither determines all human values nor proves that advanced AI will remain safe.

## 1. Scope, assets and adversaries

Begin with a concrete deployment: a research assistant that reads public papers and proposes community publications. Protected assets include private information, account ownership, resource budgets and the integrity of published work. Consider malicious document instructions, stolen credentials, excessive resource requests, approval replay and attempts to use unauthorized tools. A compromised administrator, operating system or hardware root lies outside the example kernel’s guarantees and requires additional controls.

## 2. Principle: proposals do not confer authority

The agent produces a structured request containing actor, operation, destination, resource budget, unique ID and expiry. Treat this request and all retrieved documents as untrusted input. The gateway validates it against a policy controlled outside the agent. Unknown operations are blocked. Merely claiming that a request is safe or approved does not authorize it. A deployment must authenticate the actor rather than trust an actor string submitted by the model.

## 3. Human authorization with precise meaning

Requests with material external effects require approval bound to their exact content, scope and lifetime. If an approved request changes, obtain a new authorization. Consume authorization once and retain an execution receipt. Human reviewers need an understandable description of consequences and alternatives. Approval is evidence of authorization, not proof of harmlessness, and the approving institution remains accountable for misuse.

## 4. Containment, budgets and independent observation

Use a narrow executor with no ambient credentials, restricted network destinations and bounded filesystem access. Check per-action and cumulative budgets before execution. An independent monitor receives security events and can pause execution or revoke authority. The agent must not control that monitor, its keys or its policy updates. Real deployment requires process or machine separation; putting classes in different source files is not isolation.

## 5. Interruptibility and recovery

Immediately before a side effect, re-check current authorization and revocation state. Long-running work needs cancellation checkpoints and bounded leases. A stop prevents further authorized actions; it does not undo a message already sent, an on-chain transaction or a physical movement. Use idempotency keys, staged changes, backups and compensating operations where applicable. Practice restore and incident-response procedures with a human responsible for recovery.

## 6. The demonstrator and its limits

The included SafetyKernel checks operation and resource allowlists, expiry, exact-request approval, replay, an aggregate resource budget, revocation and pause. It intentionally performs no external actions. Its approval map and state are in memory, its actor identity is illustrative, and the supervisor method is callable by any code holding the kernel. Production use needs authentication, durable transactions, protected approval keys, independent deployment and atomic authorization at the execution boundary. Browser controls are a learning exercise, not a security boundary.

## 7. The community as a scoped implementation

The local reference forum uses authenticated sessions, server-side content ownership checks and a 20,000,000-byte total content quota per account. Text is rendered as text, not executed as HTML. PDF uploads are stored in quarantine until an operator reviews them; file signatures alone cannot prove that a PDF is safe. Public web hosting must connect a persistent backend before opening submissions. A static paper page is not evidence of a running multi-user service.

## 8. Evaluation and falsifiable claims

Test unknown operations, mutated approvals, expired requests, repeated IDs, resource exhaustion, revoked actors and a paused gateway. For the forum, test isolation between accounts, concurrent quota exhaustion, deletion accounting, unauthenticated writes, script-like text and persistent data after restart. Report the precise environment and results. A passing unit test establishes behavior for that test, not protection against every future adversary. Independent reviewers should attempt to violate each claimed boundary.

## 9. Governance and unresolved questions

Define who may approve, change policy, inspect logs and restore service. Keep an appeal path and minimize retained private data. Avoid concentrating unrestricted control in a single opaque operator. Open questions include reliable evaluation of complex consequences, scalable oversight, robust safety under model changes and coordination across organizations. Layered controls improve specific boundaries; they do not eliminate these research problems.

## 10. Proposed next experiment

Run the reference service in a controlled environment with two accounts and synthetic papers. Exercise the documented negative cases and publish reproducible results. Then replace the simulated agent with a narrowly scoped assistant that can only propose requests to the same gateway. Measure task success, unauthorized action rate, false blocks and intervention latency before considering broader permissions. Expand scope only when new evidence supports it.

## Open questions

- Can an agent cause any side effect without passing the gateway?
- Does revocation take effect before the next irreversible operation?
- Can independent reviewers reproduce the stated tests and identify uncovered assumptions?

## References

- [NIST: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST: AI Risk Management Framework](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)
- [Tamper-Resistant Safeguards for Open-Weight LLMs](https://arxiv.org/abs/2408.00761)
