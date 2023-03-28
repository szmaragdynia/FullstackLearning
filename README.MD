# Fullstack Open 
This repo contains all the excercises and everything else regarding my learning path, learning from the Fullstack Open, from the University of Helsinki.


## Info for reviewer(?):
On branch master is work for review - clean and nice.<br>
Another branches are for learning purposes so they might be messy :) (more comments, explanations, perhaps additional directories to check how stuff works or some edge cases etc.)


## Notes for myself:
### **Git-workflow: (shown by example)**
#### **A. Just  starting out - first part ever etc.**
1. Your master and master-dirty are the same. 
2. Checkout to master-dirty, in case they were not (master-dirty is fuller version of master).
3. checkout to new branch, e.g. part0. You should commit, and you can push (e.g. so you could work from another pc etc.)
4. When work is done, you:
    1. merge part0 with master-dirty (assuming part0 has lots of comments, maybe more directories etc.)
        1. git checkout to where you want to merge INTO (git checkout master-dirty) and then merge (git merge part0 (git merge WHERE_FROM)). Master-dirty should now contain whatever was there previously AND new part0.
    2. checkout to part0 to clean it up - so it's presentable and merge it with master (the clean one). Steps similiar/the same as above.
    3. delete branch part0 locally and the remote.
5. You now have master with clean part0 and master-dirty with dirty part0.

#### **B. Further work (listing this just so I can see if my reasoning is correct).**
1. Your master and master-dirty are DIFFERENT.
2. Checkout to master-dirty, so you work on fuller version (comments, testing stuff etc.)
3. checkout to new branch, e.g. part1. You should commit, and you can push (e.g. so you could work from another pc etc.)
4. When work is done, you:
    1. merge part1 with master-dirty (assuming part1 has lots of comments, maybe more directories etc.)
        1. git checkout to where you want to merge INTO (git checkout master-dirty) and then merge (git merge part1 (git merge WHERE_FROM)). Master-dirty should now contain whatever was there previously(part0) AND new part1.
    2.  checkout to part1 to clean it up - so it's presentable and merge it with master (the clean one). Steps similiar/the same as above.
    3. delete branch part1 locally and the remote.
5. You now have master with clean part0 and part1 and master-dirty with dirty part0 and part1.

### **Details:**
Directories not to be contained in clean repos are starting with number 0 (e.g. 0-mdn-forms)

### **Time used:**
* Part1. 
    * 2:45 - before the below ones - part1a I guess.
    * 3:30 (+maybe 30-50 configuring stuff [downloading node on PC etc.]) - mon20/03 - learning from part1b.
    * 4:00 - tue21/03 - mdn's js overview.
    * 1:00 - wed22/03 - yt vid var/let/const. Today giving brain some rest, and tackling everyday small tasks.
    * 0:00 - thu23/03 - I did nothing, I suck!
    * 0:50 (+0:30 fighting with vscode) - fri24/03.
    * 0:15 (+0:40 cleaning the 'npm eject' aftermath) - sat25/03 <br> 
    * 8:30 - mon27/03.
        * 5:20 was used in the period from 01:30AM to 08:30 AM, despite waking at ~14 and starting learning at ~18. Noting for checking whether night is really that overpowering for me.
    * 1:55 - tue28/03 - finished excercises, cleaned up,
    * *SUMMARY (excluding the time in parenthesis)*:
        * Overall time spent learning: 22:45
        * For a week of time, tuesday 21/03 to tuesday 28/03: 16:30<br>
        * Started 15/03, finished 28/03. Started in Cracow, then done the papers, then it was monday etc.