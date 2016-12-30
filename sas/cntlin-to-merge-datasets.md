# `cntlin` to merge datasets

Today I learnt about the use of user-defined formats, specifically the use of `cntlin` to merge datasets. In the example below, we first declare the names and birthdays datasets. One contains names of empIds, the other one birthdays. 

```sas
data names;
   infile datalines; 
   input empId $ name $;
   datalines;                     
101 Ender
102 Peter
103 Valentine
104 Graff
105 Locke
;

data birthdays;
   infile datalines; 
   input empId $ birthday date11.;
   format birthday mmddyy10.;
   datalines;                     
101 17APR1997
102 20JUN1955
103 12AUG2000
104 5NOV1970
105 24DEC1920
;
```

Now we need to create either birthdays or names format as below. There must be a unique `start` value which marks the key of format value. In this case it is `empId`. The `label` becomes a `birthday` value and it's the value to which the key corresponds i.e. key `101` corresponds to value `17APR1997`. Finally, we need to declare a format name and assign it to variable `fmtname`. The user-defined format is finally created using `proc format cntlin` procedure.

```sas
data birthdays_fmt_set;
	rename empId=start;
	set birthdays;
	label=birthday;
	fmtname='$birthdays_fmt';
run;

proc format cntlin=birthdays_fmt_set;
run;
```

Now that we have the user-defined format in place, all there is left to do to merge the two datasets is make use of that format by putting to use the `put` function. The first argument is the value we want to format, and the second value is the format itself, in this it's `$birthdays_fmt.` containing all the birthday values.

```sas
data emps_names_birthdays;
	set names;
	birthday=put(empId, $birthdays_fmt.);
run;
```