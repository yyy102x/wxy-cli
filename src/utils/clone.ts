import simpleGit,{SimpleGitOptions,SimpleGit} from 'simple-git'
import createLogger from "progress-estimator";
import chalk from "chalk";
// 初始化进度条
const logger = createLogger({ // 初始化进度条
    spinner: {
      interval: 100, // 变换时间 ms
      frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.green(item)) // 设置加载动画
    }
})

const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(), // 根目录
    binary: 'git',//指定 git 二进制文件路径
    maxConcurrentProcesses: 6, // 最大并发进程数
  };

export const clone=async (url:string,projectName:string,options:string[]):Promise<any>=>{
    const git:SimpleGit=simpleGit(gitOptions)
    try{
        await logger(git.clone(url, projectName, options), '代码下载中: ', {
            estimate: 8000 // 展示预估时间
        })
         // 下面就是一些相关的提示
    console.log()
    console.log(chalk.green('代码下载成功'))
    console.log(chalk.green(`==================================`))
    console.log(chalk.green(`=== 欢迎使用 wxy-cli 脚手架 ===`))
    console.log(chalk.green(`==================================`))
    console.log()
    console.log(chalk.green(`=== 欢迎使用 pnpm install 安装依赖 ===`))

    console.log(chalk.green(`=== pnpm run dev 运行项目 ===`))


    // log.success(`项目创建成功 ${chalk.blueBright(prjName)}`)
    // log.success(`执行以下命令启动项目：`)
    // log.info(`cd ${chalk.blueBright(prjName)}`)
    // log.info(`${chalk.yellow('pnpm')} install`)
    // log.info(`${chalk.yellow('pnpm')} run dev`)
    }catch(err:any){
        console.log(err)
        console.log(chalk.green('代码下载失败'))
        // log.error(String(err))
    }
}