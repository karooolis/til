# Useful Vim commands

## Switch modes
- `i` - insert mode
- `Esc` - normal mode
- `v` - visual mode

## Movement
### Characters movement
- `h` - left
- `l` - right
- `k` - up
- `j` - down

### Words movement
- `w` - start of next word
- `e` - end of the word / end of next word
- `b` - beginning of the word / beginning of previous word
- `<number><keyword>`- 3->w - same as pressing "w" three times

### Lines movement
- `0` - beginning of the line
- `$` - end of the line

### Entire file movement
- `gg` - beginning of a file
- `G` - end of a file
- `<number>G` - go to line <number>

### Other movement
- `%` - jump to the matching (, { or [

## Search
- `f<char>` - find next occurrence of a character
- `<number>f<char>` - find nth occurrence of a character
- `/<phrase><Enter>` - find phrase - then press "n" for next occurrences
- `*` - find next occurrence of a word where the cursor is at
- `#` - find previous occurrence of a word where the cursor is at

## Text editing
- `<number>i<phrase><esc>` - `30->i->write "go"->esc` - insert "go" three times
- `o` - open new line below in "Insert" mode
- `O` - open new line above in "Insert" mode
- `r` - replace character where the cursor is at
- `x` - delete character where the cursor is at
- `X` - delete one character to the left of where the cursor is at
- `d<indicator>` - dw - deletes characters or words as described by the indicator
- `a` - append where the cursor is at
- `A` - append at the end of the line

## Other commands
- `.` - repeat previous command
- `u` - undo
- `Ctrl+R` - redo
- `:help` - Vim help

## Save commands
- `:w` - save
- `:q` - quit
- `:q!` - quit without saving

## Resources for learning Vim
- [OpenVim](http://www.openvim.com/sandbox.html)




