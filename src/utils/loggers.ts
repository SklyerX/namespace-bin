import chalk from 'chalk';

export function success(message: string, route: string) {
  const yellow = chalk.yellowBright(`${route.toUpperCase()}`)
  console.log(chalk.green("[ " + `${yellow}` + " ]" + `${message}`))
}

export function alert(message: string, route: string) {
  const cyan = chalk.cyan(`${route.toUpperCase()}`)
  console.log(chalk.green("[ " + `${cyan}` + " ]" + `${message}`))
}

export function error(message: string, route: string) {
  const white = chalk.white(`${route.toUpperCase()}`)
  console.log(chalk.red("[ " + `${white}` + " ]" + `${message}`))
}

export function warn(message: string, route: string) {
  const magenta = chalk.magenta(`${route.toUpperCase()}`)
  console.log(chalk.red("[ " + `${magenta}` + " ]" + `${message}`))
}
