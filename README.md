# JAM_challenge

Books App:
Using react (create-react-app) & typescript & redux/tookit,redux thunk & Ant design
Features: Login. Logout, add new book, view all and view details


Git knowledge:

1. How do I create a new branch in Git?
```bash
git branch branchName
```

2. How do I switch branches in Git?
```bash
 git checkout branchName
 ```

3. How do I push changes to a remote repository?
```bash
git push origin  branchName
```

4. Write a script that will take a list of files and move them to a new branch.
```bash
 new_branch="new-branch"
 git branch $new_branch

 git checkout $new_branch

 for file in "$@"; do
   git mv $file .
 done

 git commit -m "Create new branch and move change files" 

 git push origin $new_branch
```


5. Write a script that will clone a remote repository and checkout a specific branch.
```bash
  remote_url="https://github.com/path_to_repo"

  branch="feature-branch"

  git clone $remote_url

  cd repository

  git checkout $branch
```

6. Write a script that will compare two different branches and list the differences in their contents.
```bash
branch1="branch1"
branch2="branch2"
git diff $branch1..$branch2
```

7. Create a script that will list all commits made by a specific user.
```bash
user="username"
git log --author=$user
```
