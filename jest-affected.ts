import {
  CreateNodesResultV2,
  CreateNodesV2,
  ProjectConfiguration,
} from '@nx/devkit';
import { execSync } from 'child_process';
import { dirname } from 'path';

export const createNodesV2: CreateNodesV2 = [
  '**/*/jest.config.ts',
  async (files, _options): Promise<CreateNodesResultV2> => {
    const result: CreateNodesResultV2 = [];
    for (let i = 0; i < files.length; i++) {
      const testFiles = gatherAffectedTestTargetNames(files[i]);
      const projectName = dirname(files[i]);
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
  return stdout
    .toString()
    .split('\n')
    .filter((file) => file.length > 0);
}

function createParentTarget(affectedTestTargetFilePaths: string[]) {
  return {
    executor: 'nx:noop',
    dependsOn: affectedTestTargetFilePaths.map(convertJestFilePathToTargetName),
    cache: true,
  };
}

function createAtomTargets(
  configPath: string,
  testFileTargetPaths: string[]
): ProjectConfiguration['targets'] {
  const result: ProjectConfiguration['targets'] = {};
  for (let i = 0; i < testFileTargetPaths.length; i++) {
    result[convertJestFilePathToTargetName(testFileTargetPaths[i])] = {
      command: [
        'npx',
        'jest',
        `--configPath=${configPath}`,
        testFileTargetPaths[i],
      ].join(' '),
      cache: true,
    };
  }
  return result;
}

function convertJestFilePathToTargetName(jestFilePath: string): string {
  const pathParts = jestFilePath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  return `jest-affected-child--${fileName.replace(/\.(test|spec)\.ts$/, '')}`;
}
