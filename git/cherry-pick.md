假设你现在正在开发一个项目，有一个功能分支 feature，开发分支 develop。 feature 有3个提交，分别是 A ，B ，C 。develop 分支只想加入 C 功能， 此时合并操作无法满足，因为直接合并 feature，会将3个提交都合并上，我想合并就只有 C，不要 A，B。此时就需要挑樱桃大法–cherry pick！

具体的做法：

1、切换到 develop 分支。
2、通过 git log feature,找到 C 的 SHA1 值。
3、通过 git cherry-pick <C的SHA1> ，将 C 的修改内容合并到当前内容分支 develop 中。
4、若无冲突，过程就已经完成了。如果有冲突，按正常冲突解决流程即可。
