# Navigation Menu

To output the hierarchical list of pages and sub-pages within a Umbraco site, `AncestorOrSelf` function comes really handy which can be used as such:

```csharp
<ul>
    @foreach (var page in CurrentPage.AncestorOrSelf(1).Children.Where("Visible"))
    {
        <li><a href="@page.Url">@page.Name</a></li>
    }
</ul>
```

In the loop above `CurrentPage` refers to our current page while `AncestorOrSelf(1)` refers to Level 1 in hierarchy list of pages. Level 1 refers to root. So in a call `AncestorOrSelf(1).Children`, all immediate children pages of root page will be selected.

The `Where("Visible")` method only queries pages that should not be hidden. By default, all pages are visible. However, by adding a `true/false` property with an alias `umbracoNaviHide` to a document type, the user can check the field making the page invisible in the navigation.

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