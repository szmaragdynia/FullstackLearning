# Fullstack Open 
This repo contains all the excercises and everything else regarding my learning path, learning from the Fullstack Open, from the University of Helsinki.<br>

On branch master is work for review - clean and nice.<br>
Another branches are for learning purposes so they might be messy :) (more comments, explanations, perhaps additional directories to check how stuff works or some edge cases etc.)
## Notes for myself:
### Git-workflow: (shown by example)
#### A. Starting out.
1. Your master and master-dirty are the same. 
2. Checkout to master-dirty, in case they were not (master-dirty is fuller version of master).
3. Checkout to new branch, e.g. part0. You should commit, and you can push (e.g. so you could work from another pc etc.)
4. When work is done, you: 

	4.1. merge part0 with master-dirty (assuming part0 has lots of comments, maybe more directories etc.)

		4.1.1. git checkout to where you want to merge INTO (git checkout master-dirty) and then merge (git merge part0 (git merge WHERE_FROM)). Master-dirty should now contain whatever was there previously AND new part0.

	4.2. checkout to part0 to clean it up - so it's presentable and merge it with master (the clean one). Steps similiar/the same as above.
	
	4.3. delete branch part0 locally and the remote.
	
5. You now have master with clean part0 and master-dirty with dirty part0.
#### B. Further work (listing this just so I can see if my reasoning is correct).
1. Your master and master-dirty are DIFFERENT.
2. Checkout to master-dirty, so you work on fuller version (comments, testing stuff etc.)
3. Checkout to new branch, e.g. part1. You should commit, and you can push (e.g. so you could work from another pc etc.)
4. When work is done, you:
4.1. merge part1 with master-dirty (assuming part1 has lots of comments, maybe more directories etc.)
4.1.1. git checkout to where you want to merge INTO (git checkout master-dirty) and then merge (git merge part1 (git merge WHERE_FROM)). Master-dirty should now contain whatever was there previously(part0) AND new part1.
4.2.  checkout to part1 to clean it up - so it's presentable and merge it with master (the clean one). Steps similiar/the same as above.
4.3. delete branch part1 locally and the remote.
5. You now have master with clean part0 and part1 and master-dirty with dirty part0 and part1.