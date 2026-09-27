# AstroBridge public website

This repository contains the source for the public AstroBridge website at
[www.astrochannel.one](https://www.astrochannel.one/), including public MA
product information and dated engineering evidence.

## Evidence boundaries

AstroBridge publishes three different types of evidence and labels them
separately:

- **Official company facts** identify the legal entity and cite the source
  document used to verify each field.
- **External automated checks** link to the service that ran the check and show
  the observation date. A scanner score is not a regulatory approval or an
  independent audit.
- **Internal engineering reports** document builds, tests, and deployment
  boundaries. They are not presented as third-party certification.

The public evidence index is available at
[www.astrochannel.one/trust.html](https://www.astrochannel.one/trust.html).

## Local checks

```bash
npm ci
npm test
```

The root build publishes static files from `public/`. Production AstroBridge and
MA backend services are maintained and deployed separately; files in this
website repository are not proof that an API is live.

## Security

Please do not open public issues for suspected vulnerabilities. Follow the
private reporting instructions in [SECURITY.md](SECURITY.md).

## License

No open-source license is granted for this repository. The source is publicly
viewable for transparency; all rights remain with their respective owners
unless a file states otherwise.
