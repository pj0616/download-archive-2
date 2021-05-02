# [Unix Shell](http://en.wikipedia.org/wiki/Unix_shell)

## Variables

All active variables can be seen by running `env`.

- `$HOME` - Expands to the path of my home folder.
- `$PS1` - Variable that represents my command prompt line.
- `$PATH` - Special environment variable that contains the command path (list of system directories that the shell searches when trying to locate a command).

## Notes

- Scripts are run in subshells, and nothing is shared "upwards". That's the difference between running a script and sourcing one. A sourced (imported) script is run in your own script's namespace.
- In shell everything is a string.
- Children never touch parent environment. It can only if it runs as part of the current process (source, function, alias).
- Pipes are used to connect one process's output with another process’s input.
- `/etc/paths.d` define paths to add to `$PATH` globally to all users.

## Links

- [Explain Shell](https://www.explainshell.com/)
- [Introduction to POSIX Shell](http://drewdevault.com/2018/02/05/Introduction-to-POSIX-shell.html)
- [Yoshua's notes](https://yoshuawuyts.gitbooks.io/knowledge/content/unix/shell.html)
- [Shell Auto-completion Systems](http://dundalek.com/entropic/shell-auto-completion/)
- [Shell and Scripting (2019)](https://hacker-tools.github.io/shell/)
- [ShellCheck](https://www.shellcheck.net) - Finds bugs in your shell scripts. [OSS](https://github.com/koalaman/shellcheck).
- [Rash](https://github.com/willghatch/racket-rash) - The Reckless Racket Shell.
- [Eternal Terminal](https://github.com/MisterTea/EternalTerminal) - Remote shell that automatically reconnects without interrupting the session.
- [patat](https://github.com/jaspervdj/patat) - Terminal-based presentations using Pandoc.
- [What does your shell prompt look like? (2019)](https://lobste.rs/s/x5ioqm/what_does_your_shell_prompt_look_like)
- [direnv](https://direnv.net/) - Unclutter your .profile.
- [mask](https://github.com/jakedeichert/mask) - CLI task runner defined by a simple markdown file.
- [Purs](https://github.com/xcambar/purs) - Pure-inspired prompt in Rust.
- [Sampler](https://github.com/sqshq/sampler) - Tool for shell commands execution, visualization and alerting. Configured with a simple YAML file.
- [Nu Shell](https://github.com/nushell/nushell) - Modern, GitHub-era shell written in Rust. ([HN](https://news.ycombinator.com/item?id=20783006))
- [Collection of pure POSIX sh alternatives to external processes](https://github.com/dylanaraps/pure-sh-bible#readme)
- [Lobsters: What does your shell prompt look like? (2019)](https://lobste.rs/s/skoapt/what_does_your_shell_prompt_look_like)
- [navi](https://github.com/denisidoro/navi) - Interactive cheatsheet tool for the command-line.
- [Announcing Alacritty, a GPU-accelerated terminal emulator](https://jwilm.io/blog/announcing-alacritty/)
- [What Is a Shell? (2019)](https://yunchi.dev/posts/what-is-a-shell/)
- [Lobsters: What shell do you use? (2019)](https://lobste.rs/s/tjjfnz/what_shell_do_you_use)
