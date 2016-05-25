# Querying page properties

In Umbraco it is very easy to query page properties. It is done by using `CurrentPage` in Razor template object as such:

```csharp
<p>The name of the current page is @CurrentPage.Name</p>
```

`Name` is a default property of any page in Umbraco and thus we can be safe knowing that this property will always be available in Razor template. However, in case the property is not available at current document level but only its parent, it can be done as such:

```csharp
<p>The title of the site is @CurrentPage._siteTitle</p>
```

Notice the underscore preceding the property alias in the example below. This instructs the Umbraco CMS to query parent pages of our current page to find if any of them contain the property alias preceded with `_`.

Also, in case we are not sure if the value will exist in the Razor template, or it's an optional value, we can use the following code snippet to format output based on whether field exists or is filled with a value:

```csharp
@if (CurrentPage.HasValue("optionalField")) {
    <p>The value of optional field is @CurrentPage.optionalField</p>
}
```

For a website with multiple levels, you can loop a page within a page within a page, as many levels as needed, as in the example below:

```csharp
<ul>
    @foreach (var page in CurrentPage.AncestorOrSelf(1).Children.Where("Visible"))
    {
        <li>
            <a href="@page.Url">@page.Name</a>

            <ul>
                @foreach (var subPage in page.Children.Where("Visible"))
                {
                    <li>
                        <a href="@subPage.Url">@subPage.Name</a>
                    </li>
                }
            </ul>
        </li>
    }
</ul>
```