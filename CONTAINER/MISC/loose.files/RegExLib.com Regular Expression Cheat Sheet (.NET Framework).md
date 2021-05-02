# RegExLib.com Regular Expression Cheat Sheet (.NET Framework)
[![RegExLib - Regular Expression Library](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/App_Themes/Green/Images/RegExLib_logo.png)](https://regexlib.com/)

| 
Metacharacters Defined
----------------------

 |
| --- |
| MChar | Definition |
| ^ | Start of a string. |
| $ | End of a string. |
| . | Any character (except \\n newline) |
| | | Alternation. |
| {...} | Explicit quantifier notation. |
| \[...\] | Explicit set of characters to match. |
| (...) | Logical grouping of part of an expression. |
| \* | 0 or more of previous expression. |
| + | 1 or more of previous expression. |
| ? | 0 or 1 of previous expression; also forces minimal matching when an expression might match several strings within a search string. |
| \\ | Preceding one of the above, it makes it a literal instead of a special character. Preceding a special matching character, see below. |

| 
Metacharacter Examples
----------------------

 |
| --- |
| Pattern | Sample Matches |
| ^abc | abc, abcdefg, abc123, ... |
| abc$ | abc, endsinabc, 123abc, ... |
| a.c | abc, aac, acc, adc, aec, ... |
| bill|ted | ted, bill |
| ab{2}c | abbc |
| a\[bB\]c | abc, aBc |
| (abc){2} | abcabc |
| ab\*c | ac, abc, abbc, abbbc, ... |
| ab+c | abc, abbc, abbbc, ... |
| ab?c | ac, abc |
| a\\sc | a c |


[Source](https://regexlib.com/(X(1)A(nd80REuYobKq-a2pHvNZBAVLAq__lsXn11CswSkIMyTh90CCPcvtMEtm2SXXqsVluGy1kevH70dEBJX9qr8Oqhc2UIBW7n28YCdxVO0LNcROhQ29dOSh4tyMtDKqpUgtfVNnQe_I7Je_uyhAaoSziI5qTJt9kfyZdSJrBRmbDVOIRuvP4988U3Ku0EF_VVRP0))/CheatSheet.aspx?AspxAutoDetectCookieSupport=1)