import { globSource, create } from 'ipfs-http-client';
const basePath = process.cwd();
const inputDir = `${basePath}/build/json`;
const projectId = '2NbdL8OBko32RDMzxVN8eAcG1Iq';
const projectSecret = 'd8c3165aeca204395e57a224c93c84dc';

async function wrapWithDir(){
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

  const client = await create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',

    headers: {
      authorization: auth
    }
  })

  const options = {
    wrapWithDirectory: true
  }

  for await (const file of client.addAll(globSource(inputDir, "**/*" ), options)) {
    console.log(file)
  }
}

wrapWithDir()
