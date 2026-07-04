import { spawn } from 'node:child_process';

const commands = [
  { name: 'Lint', command: 'npm', args: ['run', 'lint'] },
  { name: 'Typecheck', command: 'npm', args: ['run', 'typecheck'] },
  { name: 'Doctor', command: 'npm', args: ['run', 'doctor'] },
  { name: 'Astro Doctor', command: 'npm', args: ['run', 'astro-doctor'] }
];

async function runCommand({ name, command, args }) {
  return new Promise((resolve) => {
    console.log(`\n========================================`);
    console.log(`[START] ${name}...`);
    console.log(`========================================\n`);
    
    // Pass full string to spawn when using shell: true to avoid DEP0190
    const fullCommand = `${command} ${args.join(' ')}`;
    const child = spawn(fullCommand, { stdio: 'inherit', shell: true });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`\n[SUCCESS] ${name} completed successfully!\n`);
        resolve(true);
      } else {
        console.error(`\n[ERROR] ${name} failed with exit code ${code}.\n`);
        resolve(false);
      }
    });
  });
}

function runAll() {
  console.log(`\n[INFO] STARTING ALL PROJECT CHECKS...\n`);
  
  runCommand(commands[0]).then((success1) => {
    runCommand(commands[1]).then((success2) => {
      runCommand(commands[2]).then((success3) => {
        runCommand(commands[3]).then((success4) => {
          let allSuccess = success1 && success2 && success3 && success4;
          
          console.log(`\n========================================`);
          if (allSuccess) {
            console.log(`[PASSED] ALL CHECKS PASSED SUCCESSFULLY!`);
            console.log(`========================================\n`);
            process.exit(0);
          } else {
            console.error(`[FAILED] SOME CHECKS FAILED. Please review the errors above.`);
            console.log(`========================================\n`);
            process.exit(1);
          }
        });
      });
    });
  });
}

runAll();
