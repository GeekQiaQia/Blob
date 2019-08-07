# Git 学习和使用

Git 的分支也非常轻量。它们只是简单地指向某个提交纪录 —— 仅此而已。所以许多 Git 爱好者传颂

早建分支！多用分支！

这是因为即使创建再多分的支也不会造成储存或内存上的开销，并且按逻辑分解工作到不同的分支要比维护那些特别臃肿的分支简单多了。

在将分支和提交记录结合起来后，我们会看到两者如何协作。现在只要记住使用分支其实就相当于在说：“我想基于这个提交以及它所有的父提交进行新的工作。
## git 分支

    git branch <分支名> 来创建分支；
    git checkout <分支名> 来切换分支；
![](https://user-gold-cdn.xitu.io/2019/7/4/16bbbfbdfe2e4060?w=904&h=239&f=png&s=20415)

上图中"master*" *号代表的是当前所在的分支；
* 提交修改之前先切换到新的分支上

        git checkout newImage; git commit 
    

![](https://user-gold-cdn.xitu.io/2019/7/4/16bbc00196555789?w=905&h=408&f=png&s=32392)

OK，已经准备好使用分支了。 创建一个名为 bugFix 的新分支，然后切换过去。

    对了，有个更简洁的方式：如果你想创建一个新的分支同时切换到新创建的分支的话，可以通过 git checkout -b <your-branch-name> 来实现。

    git branch bugFix;
    big checkout bugFix;

## 分支与合并
太好了! 我们已经知道如何提交以及如何使用分支了。接下来咱们看看如何将两个分支合并到一起。就是说我们新建一个分支，在其上开发某个新功能，开发完成后再合并回主线。

咱们先来看一下第一种方法 —— git merge。在 Git 中合并两个分支时会产生一个特殊的提交记录，它有两个父节点。翻译成自然语言相当于：“我要把这两个父节点本身及它们所有的祖先都包含进来。”


![](https://user-gold-cdn.xitu.io/2019/7/4/16bbc1c2a844eba2?w=900&h=403&f=png&s=35579)


![](https://user-gold-cdn.xitu.io/2019/7/4/16bbc1ebd0c20254?w=897&h=412&f=png&s=45535)


![](https://user-gold-cdn.xitu.io/2019/7/4/16bbc21529aa74a8?w=904&h=409&f=png&s=34999)


![](https://user-gold-cdn.xitu.io/2019/7/4/16bbc21e670449ac?w=899&h=406&f=png&s=39611)
练习：
* 创建新分支 bugFix
* 用 git checkout bugFix 命令切换到该分支
* 提交一次
* 用 git checkout master 切换回 master
* 再提交一次
* 用 git merge 把 bugFix 合并到 master


![](https://user-gold-cdn.xitu.io/2019/7/4/16bbc23a2dc983e7?w=499&h=983&f=png&s=35693)

    git branch bugFix;
    git checkout bugFix;
    git commit -m 'bugFix commit';
    git checkout 'master';
    git commit -m 'master commit';
    git merge bugFix;


[练习传送门 https://learngitbranching.js.org/](https://learngitbranching.js.org/)
