import {
  CreateNodesContextV2,
  CreateNodesResultV2,
  CreateNodesV2,
  ProjectConfiguration,
  Target,
  Task,
} from '@nx/devkit';
import { execSync } from 'child_process';
import { create } from 'domain';
import { dirname } from 'path';

export const createNodesV2: CreateNodesV2 = [
  '**/*/jest.config.ts',
  async (files, options): Promise<CreateNodesResultV2> => {
    const result: CreateNodesResultV2 = [];
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      const testFiles = gatherAffectedTestTargetNames(files[i]);
      const projectName = dirname(files[i]);
      console.log('projectName', projectName);
      result.push([
        files[i],
        {
          projects: {
            [projectName]: {
              targets: {
                ['jest-affected']: createParentTarget(testFiles),
                ...createAtomTargets(files[i], testFiles),
              },
            },
          },
        },
      ]);
    }
    return result;
  },
];

function getAffectedFiles(): string[] {
  const stdout = execSync('git diff --name-only HEAD~1');
  console.log(stdout.toString());
  return stdout.toString().split('\n');
}

function gatherAffectedTestTargetNames(configFilePath: string): string[] {
  const affectedFiles = getAffectedFiles();
  const stdout = execSync(
    [
      'npx',
      'jest',
      `--config=${configFilePath}`,
      '--listTests',
      '--findRelatedTests',
      ...affectedFiles,
    ].join(' ')
  );
  console.log(stdout.toString());
  return stdout
    .toString()
    .split('\n')
    .filter((file) => file.length > 0);
}

function createParentTarget(affectedTestTargetNames: string[]) {
  return {
    executor: 'nx:noop',
    dependsOn: affectedTestTargetNames,
    cache: true,
  };
}

function createAtomTargets(
  configPath: string,
  testTargetNames: string[]
): ProjectConfiguration['targets'] {
  const result: ProjectConfiguration['targets'] = {};
  for (let i = 0; i < testTargetNames.length; i++) {
    result[testTargetNames[i]] = {
      command: [
        'npx',
        'jest',
        `--configPath=${configPath}`,
        testTargetNames[i],
      ].join(' '),
      cache: true,
    };
  }
  return result;
}
