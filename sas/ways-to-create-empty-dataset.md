# Ways to create empty dataset

I recently searched for ways to create empty SAS datasets. The two below work equally well and I do not if either can be considered better in any respect.

```sas
proc sql noprint;
create table new_dataset
(
	Dataset char 100,
	Message char 150,
	Status char 10
);
quit;
```

```sas
data new_dataset;
	length Field $100 Message $150 Status $10;
	call missing(Field, Message, Status);
	if _N_ = 0 then output;
	stop;
run;
```

Then, to fill the datasets with data it would be as simple as:

```sas
proc sql noprint;
	insert into new_dataset
	values ('01', 'Message 01', 'Status 01');

	insert into new_dataset
	values ('02', 'Message 02', 'Status 02');

	insert into new_dataset
	values ('03', 'Message 03', 'Status 03');
quit;

```
