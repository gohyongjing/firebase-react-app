function parseHostAndPort(hostAndPort: string | undefined): { host: string; port: number; } | undefined {
  if (hostAndPort == undefined) {
    return undefined;
  }
  const pieces = hostAndPort.split(':');
  return {
    host: pieces[0],
    port: parseInt(pieces[1], 10),
  };
}

export async function getFirestoreCoverageMeta(projectId: string, firebaseJsonPath: string) {
  const { emulators } = await import(firebaseJsonPath);
  const hostAndPort = parseHostAndPort(process.env.FIRESTORE_EMULATOR_HOST);
  const { host, port } = hostAndPort != undefined
    ? hostAndPort
    : ( emulators?.firestore ?? { host: '127.0.0.1', port: 8080 } );
  const coverageUrl = `http://${host}:${port}/emulator/v1/projects/${projectId}:ruleCoverage.html`;
  return {
    host,
    port,
    coverageUrl,
  }
}
