# Razor Syntax

Finally the university exams are over and there is time to delve deep into [Umbraco CMS](http://umbraco.com/) which I have been wanting to explore for quite some time now. Umbraco relies on Razor templating engine for rendering so today let's explore Razor syntax.

## Code block

```csharp
@{ 
  int x = 123; 
  string y = "because.";
}
```

## Expression

```razor
// HTML encoded
<span>@model.Message</span>

// HTML unencoded
<span>
@Html.Raw(model.Message)
</span>
```

## Combining text and markup

```razor
@foreach(var item in items) {
  <span>@item.Prop</span> 
}
```

## Mixing code and plain text

```razor
@if (foo) {
  <text>Plain Text</text> 
}

// alternative Syntax
@if (foo) {
  @:Plain Text is @bar
}
```

## Using block

```razor
@ using (Html.BeginForm()) {
  <input type="text" value="input here">
}
```

## Server-side comment

```razor
@*
This is a server side 
multiline comment 
*@
```

## Full page example

```razor
@* Variables declaration *@
@{
    var theMonth = DateTime.Now.Month;
    var theYear = DateTime.Now.Year;
    <p>1. We are in the year theYear - theMonth</p>
}
<p>2. We are in the year @theYear - @theMonth</p>


@* If/else statements *@
@if (theYear == 2015)
{
    <p>Yay</p>
}
else if (theYear == 2016)
{
    <p>Lalala</p>
}
else
{
    <p>Hooray</p>
}
    
@* For/while/foreach loops *@
@for(var i = 0; i < 21; i++)
{
    <p>Line #: @i</p>
}
       
<ul>
    @foreach (var i in Request.ServerVariables)
    {
        <li>@i</li>
    }
</ul>

@{
    @: Plaintext example
    var count = 0;
    while(count < 50)
    {
        <p>Count #@count</p>
        count++;
    }
}

@* Raw HTML *@
@{ var someHtml = "<br><p>This is a <strong>html</strong> snippet</p>"; }
@someHtml
@Html.Raw(someHtml)
```

## Resources

- [umbraco.tv Razor syntax course](http://umbraco.tv/videos/umbraco-v7/implementor/working-with-umbraco-data/razor-syntax/htmlraw/)
- [C# Razor Syntax Quick Reference](http://haacked.com/archive/2011/01/06/razor-syntax-quick-reference.aspx/) by Phil Haack