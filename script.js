const letterToDigit = {
  'L': '1', 'Z': '2', 'E': '3', 'A': '4', 'S': '5',
  'G': '6', 'T': '7', 'B': '8', 'J': '9', 'O': '0'
};

const digitToLetter = Object.fromEntries(
  Object.entries(letterToDigit).map(([k, v]) => [v, k])
);

const items = {
  "JackintheBox": "https://i.getgems.io/uPS5SvaQyC5ASFmdYEgXbErRY1jou5Wr90YlWhtKN-Y/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUE0MDFRcXBYdEJud0lhRGJGandkNXlYZlAybVlpQ3VzYkozWmN3OWVYUjlDcUwvZWIyNWRiNjAwMjE2YWQ3MA",
  "Neko Helmet": "https://i.getgems.io/x05TjHuj-HjeTeVJl9ptKgbDg9Uaa_950fbpbiMQgS0/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJheUNZMndad3JWQkV4TmZMTDh2OUswbUhObXJRVG50WmxkZ3BZaVJ3Ql9RS0svZjVmODYzYWJlYjViZmNiNg",
  "Top Hat": "https://i.getgems.io/aGbPoI1CyRXeE6x9AMxdCuGz-wvr4yNSphHPewrIts0/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUFEdkp4TXhDSEE3ZlJsWWpvY2VCT1JmN1J3S3MwcnpqVmFLZXBRQUNNblp6RzcvMTFhNmZmMzc3NjVmYjYxYQ",
  "Love Potion": "https://i.getgems.io/iCNUsutnYFMxcwG82UmMfDWsF5UCk9nirdQbiE15fv8/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUQ3eUR1MldDZ2Q5VXp4MWRGX0RRa1dLN0laSko0TXA5TTlnMXJHVVVpUUU0M20vZGJjMDEwMjVlM2E4NDZjOA",
  "Toy Bear": "https://i.getgems.io/MRKzpR-059T59Qd1A1eNR_JoL2rrDM_zMYSiI61mWFI/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUMxZ3VkNlFPOE5kSmpWcnFyN3FGQk1PMG9Rc2t0a3Z6aG1JUm9NS284dnhpeUwvZGQ4ZWM5YTAyNzI1Y2UwMA",
  "Diamond Ring": "https://i.getgems.io/LCiKaXHspUPVHEudX8uSj67UekP_igOX4Lkz0cf20cc/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNXaDFsUGx0eVR3Q1d4Q1htNHVtTDV0UFpvWFI4a1RJY1QtcGQwSnFvYWRMSG8vMDUzOTkyNjBiZjZkOTQ2ZQ",
  "Loot Bag": "https://i.getgems.io/bwA6U2KvyaUiH3XdMBET1zkbN4KSnx04YkYttxrwvzM/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNFODBBbG44WWZsZG5RTHdXTXZPZmxvTEdnbVBZMGVHREp6OXVmRzNnUnVpM0QvMjlmYTMyMGE1ODcxYjM1OQ",
  "Lunar Snake": "https://i.getgems.io/-E1oJOebINuGtwLaKQWZ9pE3e92qd_lhsIW3lWw0Tk8/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUMybHNVeTFTS3hKRUpCd2o1WkNmVm5MUHZBcURxeTVjMjZYZzh4U19wRFRYR2svYWQ2ODIzMjExYzUyMDY4Mg",
  "Tama Gadget": "https://i.getgems.io/zqnmjhogqNvpaA5Alan5G605fR_NrV9mw101Fnlr-5o/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUFfa3gyV095ZFhXellVWU8xRFA4MGFIbDR5aGxMR1loeGpQQXRSUE5qTWdmWU0vMTA4ZWRkZGM1OTViMjRlOA",
  "Candy Cane": "https://i.getgems.io/xpJjtV1j7c07pd-YUGRiKcrwlW9AaEHMDxe02DY_zns/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUURMTTY1dDBzaFM3Z1pBZzBsTWx0R0hZaHNVOTRQenNNSkhoWWlibVJWN2tkVXMvYzVjMzU4ZGY5OGNiMjg4MA",
  "Cookie Heart": "https://i.getgems.io/iNGuJnr1Q-I2YWEgk7O9XMOc_yWckeHYsSLFx10bKIY/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJUOVBiWkJSNkZHY1pCU253Z28tRExwYzByN19YXzhkbGhHNVVBNnY5bDl1Sk0vM2E0NTk3NDU0MTk2YWUxZg",
  "Party Sparkler": "https://i.getgems.io/pGNa7gtlmg1oPgtK1NmLf6nGUqCQdwtbbqHaFEa07b8/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNhMUkwOWZFOVVvVFY2YXdNNlFDOS1ma3Y1MWhvaWkyNHcxdEpvRmZpZ0dfYXgvY2Q4YzJlMDU4MzQzNjc2NQ",
  "Jingle Bells": "https://i.getgems.io/2HmbjV2e0420Kj9dsnrNSpRgfsFg-ZN-vHZzWquw6lM/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNlaHJrWnRLRHRWZTBxeXZCQXNySHgzaFctaHJvUXlEclNfTVpPT1ZZdGgyREcvNDcxYThkOTMxZDI2MGY2MA",
  "Ginger Cookie": "https://i.getgems.io/pw2ztx6zAJDUdnvRrAoHaQDDAPpXQDwrudPLsKGTjDM/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJDZTc1RzBBaGpxQzY0QjdIX0JIUDB3Z2ZPTlhfeDk4cnN6bXNFd25kRFZBakcvZTA5N2IwNGUwODVjZWE0Yw",
  "Winter Wreath": "https://i.getgems.io/O78JD_u3_acyg1toyk73xv1_Xvn06AyXQQXr5wpMpwA/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUM4V1ZXOURTTjRQUGZGbENXMkFISmtYeEJVSEJGc3ZuaFhpWXFTVHBEN3RYc3AvYzMzZDVmOTY3ZmY2N2MxYg",
  "Santa Hat": "https://i.getgems.io/ZN3alzDUPCsOODF5cceJxzLLeIxS77VKVR5BnNJPJyI/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUFhVElSN29KeW93RGl1bVlMVk4wb2U2MWtHRTNJNkVQRW43V2dIUEd1V0FlQ3kvMjRjOWQyMTU3ZTFkNWNhOQ",
  "Snow Globe": "https://i.getgems.io/OkK-xG-tJv4cN9-zrHyybTxG-K40kTMy90c63y6bmJM/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUFQTnU2NDhmZV91cVVvZUg2Vl8tZklESlllYV81WHUyclhuNmlaRmlsNDliTVkvYzcyNzNhOTQ3OWFjMDcwZQ",
  "Snow Mittens": "https://i.getgems.io/w_F5Gr-dMNuGhECqC1cnMF6NUFBB1966OTyXnWaW_JY/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUFJTS01UXpaR1hZVFNaUjFSR2VUMmc5ck5wWW1OUFEwOV9IdHZhSW5IYVR5UFgvMTJmYjRiZTRmYmJkYzc2ZQ",
  "Sleigh Bell": "https://i.getgems.io/9QxrVhpWkWDthmAxGmJCKtCITD1AHs9kqiMq4zZlfUc/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJjTnhNQ1R5RUhrY1E1Y0szZk9fM0ViamY2SmNBNUpKX09KVjRucEROLTYwNFAvY2M4MDAzNzQxYjE3ZTZhZA",
  "Jester Hat": "https://i.getgems.io/pJb0R0CMd8YkCuCQGZ-we0Xrpbizif-_NpiMd-7_LYQ/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNCS19KQkFTQUE1WFZ6MUQxN1BuLS1rUWFNV20wYjl3UmVWdHNFZFJPNFRneTkvMmM4NWZhYzhjNDAzZDY3ZA",
  "Star Notepad": "https://i.getgems.io/P9_w1GPsSOtbDUxnm7VSXf-wOAJWC141H2f_fFoMRJk/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJBWFI2OGYxVWdSaFRvRlJfYlhZMXpQSnk1TzZzbTJTdDBDUlRvOTJCVHhHaUgvZWNlMjZkMjNiZmU0OWFiZA",
  "Bunny Muffin": "https://i.getgems.io/DJdPzXiVy3gtMT48dMvRwOFDrMP3rf7rsyGfqTJyBHE/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUF3enViZW9Kd25xbW1CdVRQcG5VU3VyUnpXUEI4RVJ6Y2Z6eDU1WjJZakUwangvYjRiMDNmYzRmNzNiYWY3Nw",
  "Swiss Watch": "https://i.getgems.io/AzIuDwERLZsA53FKy_NcRfayMlZ00TgnxdUpu30JjuM/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJJMDdQWGV3OTRZUXo3R3dONzJuUE5HRjZodFNUT0prdVU0S3hfYmpUWnYzMlUvZGI3NzdmZmFkODc5NTc4Nw",
  "Signet Ring": "https://i.getgems.io/NFSm0b2GistKbjOTzQ1RJVjeMUotkZg6u-RjEIQZGLk/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNyR0E5c2xDb2tzZ0QtTnlSRGp0SHlTS04wVHM4azZoZHVlSmtVa1paZEQ0X0svYjRlZGVkNThlODE1ODhlNw",
  "Genie Lamp": "https://i.getgems.io/S6l-YwRbHVeKkEc-mfV9nSMe0hE2f9Dx8Enzq90FaKU/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUN0MkMzeUNSTlgyNjdCM2w2aDFRc1U2YWdtNFpnVEFiN05wVkdpRktsQlhPQUEvYzdlMDk2MWEwYzM4YWFlNQ",
  "Astral Shard": "https://i.getgems.io/SV2el5_5xgkVpT10S43gjTaJaoj1OaENZ4c0rSmsM7w/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUURJUmVsZU9rVHhDRDRnX1hFbTh4ajBMWU5nNi16TXNUR0FBd0NBLXZFYmtHQnUvNWY3MWQwY2ExNzFlNzIxZA",
  "Precious Peach": "https://i.getgems.io/KyxPc3CjUdLtrsvLq8IyQXkmNZ75XokK_QnrMMahsPQ/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUE0aTU4aXVTOURVWVJ0VVo5N3NabzVtbmtiaVlVQnBXWFFPZTNkRVVDY1AxVzgvNTM3MGRlZTJmZjc1OGFjOQ",
  "Plush Pepe": "https://i.getgems.io/-F0OKO49AWzjp5XPBgwV3JizE0yb5J7T2I9t6fMcPXw/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJHLWc2YWhrQVVHV3BlZldieC1EXzlzUThvV2J2eTZwdXVxNzhVMmM0TlVERlMvZjNmNzQxYTc2NzlkZDFmMg",
  "Spiced Wine": "https://i.getgems.io/heJYwWpQ-jIqC32iiGZJ3GaOPOG9bb4587QS3lAYcyg/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUE4RENXeUNXeXl3Z09LWU9SZXJSb1NWZXZXclVRX0ZqS1FnTmloeFkxMjI3eDcvNjM1ZTRiMjg4MTU5MDdlMg",
  "Jelly Bunny": "https://i.getgems.io/DJdPzXiVy3gtMT48dMvRwOFDrMP3rf7rsyGfqTJyBHE/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUF3enViZW9Kd25xbW1CdVRQcG5VU3VyUnpXUEI4RVJ6Y2Z6eDU1WjJZakUwangvYjRiMDNmYzRmNzNiYWY3Nw",
  "Hanging Star": "https://i.getgems.io/zOZV9zbagea39N3_ODFiwr9fHzQhMQLVHYg6blqH-yo/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUI4ekx6RU9GUUszcVR5TVlnUEQ4QnV6bU53Ymxub3VxYUI4MFBXLXMyRTduY3QvNzBjMjEwNzE4OWE5MTQ2Nw",
  "Durov's Cap": "https://i.getgems.io/bVZkLFEPSnlo8A_I1OnZf5LpWNwN1pL3tOlOdR0W7Tg/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUQ5aWtacTZ4UGdLanptZEJHMEcwUzgwUnZVSmpid2dIclBaWERLY193c0U4NHcvNDAzNTFkMTA4NWYxYTY2MA",
  "Love Candle": "https://i.getgems.io/iJs0iyIMRLDeYZi_qxGF3_zyz8MkO7cs4UKU8aRKS5k/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUURxSHdTelU0SV9VNDR2U005RURQNEhHR0tXeTl5V2piemtwQ2EzSzhpTUJFVkQvMGJiYjZjOWNmOWFlNjMwOQ",
  "Perfume Bottle": "https://i.getgems.io/YyjTmxh2_cDXVErqXYGx71hUMQDkXaMK4xp9hfkG_Pg/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUURKc045T0pCaEtHWm9XWld0a0VwemtDZkl1MTZaOVV6VFdiWWplTHB1SGRUNWYvOTEwYmRjZmVkNWE2NGJiNw",
  "Mini Oscar": "https://i.getgems.io/38jjcr7B1dWJT0NGHgGZByyVhC5SiWSVDyG27MfrRFA/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNaeHhGTVMteTFoY0dBREw2RVBCN3VzTnN0UXFEOXUteUJhWXBYVlZNcjc1TkYvMGNhYzIxNWVmYTA0MTM1NQ",
  "Eternal Rose": "https://i.getgems.io/eRt_YnRqT9xdipSGpk5V6ZH4AON_F51V5hZiruH--l4/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUR1bXkzYm5aWXpWNGJTV01TU1prbVhxeDUwWHVINWQ5UmxYX3lFaTJGTmxpdmsvMTg5N2MxZDEyMmFmMGNlZQ",
  "Berry Box": "https://i.getgems.io/nXWWwDWh5uC6kRQKpaVP-83d9lJaApjBIHuLwSYJVWA/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUI0eDNzVDFEVmRPRHpheTNILTRWSklkT29vUzUta1RneUtjWU1aV29nUE9zaXEvNDJhYzFhMGFiZTk1M2ZiMg",
  "Vintage Cigar": "https://i.getgems.io/mLal102tWekZ5WwtrPnl4OLHPpspxB9tp0wtrWVt3mk/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUFDY1FwUjJmbWRlRU5XZEUyWUdRV0hWeFNUeUE4WnE0X2s3cmtfSWF4Q1JYTmUvYTkzN2Q4ZjdiNDQ5NWY5Mg",
  "Record Player": "https://i.getgems.io/MrSqz4dW5nmlLumtxm9qB_NNM4Y0GbeEP_TM8a0Gzss/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUURyNHhuNV9Hb0N6RHhoR0pNZWs3ZnYzbm02VzdiaFJ2bERTQmpjTlp1bDUydFovZDU0YzliMDM1ODI4ODEwOQ",
  "Magic Potion": "https://i.getgems.io/UD-59S6QpWSJ_pY3rIu2L3ALeTkqzw1x-KChKo04iCE/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUF0RlU5R3JHZml4NFVHOURPaXZONThReHZnQkpVYUFaX3BkWkJaQ21iaEtvNFAvMTFlZDliYTE3MDU0ZjFkZg",
  "Electric Skull": "https://i.getgems.io/fT_HDfEPA76m2WNa6IobGIxyEYzqULWKvibbDuQOTuk/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUFPWVlKaWI4SzYtOTFUamVPWVJiV0V0YnRSSkhYS29XbHRuVUx3ZGFxZDdtUjUvMWZiN2E3YWY5NzhjYmRhZA",
  "Kissed Frog": "https://i.getgems.io/GI8YZSaNj6RJHLYM3snKMKGct-WWH55II4o1oP4pUzw/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUURUcm8tb2dKYlM3by1PQkQ2YnQyTnlzUHQ3U25HbTV6ZnVSWEdCMW5FX3JiR2EvMDcwNWQxYThkODcyYmJjNQ",
  "Hypno Lollipop": "https://i.getgems.io/RRVfK-rvEK4hpW8syVF9Hmy93e4qlpkPCsbdT8eG28c/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUM2NVl5Nk4wNHZIb2VDSjB5bzRxbGw1ZXUtWmFXYlM1bnhzZGlseHltaG1TdXMvOTEzMjllNDNjMmM4ZjdmMA",
  "Hex Pot": "https://i.getgems.io/NIAdHaoxnbWjXQDS1pUT9oSAxr3zT0_IDKwoNB7SH_I/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUI2QXRCUE91VHRRbWw4b1NBN1g4WnFKNVFtY09ZWXFvejkyc1FZWEdVUXJ4eUIvZDMwNGJlYWM0ODQxY2I4MQ",
  "Evil Eye": "https://i.getgems.io/C83KWKW--51NvbBtPn1rxv3fey1Xvg9ZLCMuqm5wYj4/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUURRNkRqUmFiVFlTQXhmMnhyWnNuc1h0cWNJbTFiajlkRjV4X2g4bE5qV1BtSDQvNDIxYmQ1NzdkODJhYmY4Mg",
  "Ion Gem": "https://i.getgems.io/yk0S-74T8qFzohHNv8lxv9gHAafLqbAQ5iKKUc2ebns/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUURMN0hNYmNhMEZ1ZnJqSEZjUm9pTGtFaU9Ya1hvT192SDJnVlVOOEpOcDRraEsvMWUyOGI2ZGZkMDNiNzFjYQ",
  "Sharp Tongue": "https://i.getgems.io/wtlk1AQMZikbXUNv8oqa_Zi1nbtISOE5A0v3iNA3kMQ/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJ3MnRPNVVhSjRjX1lYdDNJOHk1S0QwazM3c3RhWnhlZFYyTzVIbXJ5aUswZE4vNjEzZmI2YzNmNmE0ZjRiNw",
  "Mad Pumpkin": "https://i.getgems.io/gv3Y0xT5JqPR2FHgzTvhbs2un50bDsq7MTmVMJqvnoY/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJkbEtoTHplellGTUNXU1dUQ25ocEtDMXV5Y3phQlVPajNFdFBqY2F0VXNUckMvMWI1OTllZTBjYTFiODk2Ng",
  "Trapped Heart": "https://i.getgems.io/zPI5fcUXshhEVi7djnJ-SZjlNpOist3gFoaIbykrWIE/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUN5QU1rYjZiTnlObEtQSDB0SmJ1YmsxVlZqQVNxeXE5c1p3a0o4QWJ4TWt4eFUvODA1ODdlNjI1NTU2MTQxMQ",
  "Skull Flower": "https://i.getgems.io/acHDREc30Jgvv5AjMaQvzy662ncQgV07lfaLgQ_0FGE/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNEQmJRWWJ2M245MVR3eXdCUkQ5WXJKTnVOVm1iRDNTcHJwcTZoV0lESFZ1NHAvMTYzMTZhZTUzYTA3NzdkNQ",
  "Crystal Ball": "https://i.getgems.io/qZlYCC2goT2gpOnH49GQ5MUdnETwxX9agmWMEVrqweE/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUF0Z2JoU0hPcVR4anVSTExPQWFiNlQ2NkZQY1FXVE5kX0RUM1ZnQ0cxLXRISncvOWY3MWZlYWQ2YWIwMzMzZA",
  "Flying Broom": "https://i.getgems.io/hLtshGt5t_xuKSs-8ug1C5VDueSpO2LNi2YxjAUseeM/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJHMm8wbHAtNk95ODZOR0VKbTcxN0JlVERBd19GNUVMa2dhWDJsOVVzZmF2V0UvOTljNjk0YmIwYWNmNmI5Yg",
  "Voodoo Doll": "https://i.getgems.io/g0IOaq922okl78Gn9uYfZxn_Wvl-uQ5uG468PMRPtII/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNOc21wSHFSU1lfRHhueWg2UDBNTU83emNBQmY4c1Z2RzB3cjI0NXBCek8zQjMvZGM1MjBiZWU3M2NhYTllNw",
  "Scared Cat": "https://i.getgems.io/JK7t0b5HWLcmxJPvB1S8472DF5qtHpkclHvMMakNIig/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUFUdVVHZHZyakx2VFdFNXBwVkZPVkNxVTJkbENMVW5LVHN1MG4xSlltOWxhMTAvOGE2MjY1MGZhNDY3NGM3ZA",
  "Witch Hat": "https://i.getgems.io/GdJbaCKNsrTImEcmVN892lrHZsFMd5AjUf13Zv3OucA/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJEOGFCS0M0TnNuWU1xdGtDZlBRazJFVm5pZXluSlFwMVVnWlZ5eDFWbVI1TWwvZDk1ZTQzNGU1OGMwYTJiMQ",
  "Eternal Candle": "https://i.getgems.io/4coFQUoYLBhc1vPeXBmyT1-79XOUIJPJizNkIXcLiJ0/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJ6WkxOSXI0bGllMHBUZnJiUnNBTkpPdEZZd1k1Z21uZ1Jmczg0UmFzNS1hVk4vNGQyZWY1YzMxMDg1MDYzYw",
  "Spy Agaric": "https://i.getgems.io/ZzG2j2QGxgodJCsMqq5ETmiOjWfxHb2VQj0BVao8I7w/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUQ2bUg5YndibjZTM01fdENSV092cUFJVzhNMzRrUndiSTAxbmlHTFJQZURQc2wvOWQ0YjY2ZmI0YjNiYzU2MA",
  "Lol Pop": "https://i.getgems.io/n7K6hru2FLeB616otfa9tyjtEyReoGLmdAY2vtRTBK8/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUM2emppZDh2Sk5FV3FjWGsxMFhqc2RETFJLYmNQWnpiSHVzdUVXNkZva09XSW0vODEzMTZhMDgwYWY3YzFmNg",
  "Sakura Flower": "https://i.getgems.io/acHDREc30Jgvv5AjMaQvzy662ncQgV07lfaLgQ_0FGE/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNEQmJRWWJ2M245MVR3eXdCUkQ5WXJKTnVOVm1iRDNTcHJwcTZoV0lESFZ1NHAvMTYzMTZhZTUzYTA3NzdkNQ",
  "Homemade Cake": "https://i.getgems.io/pmEW8Vf6jRPo3DrGw_jKVRArUf_126GoeSc5xZGNmD0/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNlZnJqaENEMl83SFJJcjJsbXd0OVphcWVHX3Rkc2VCdkFEQzY2ODMza0JTM3kvYjYwZWNhYmUxYmMwYjU2Yg",
  "Desk Calendar": "https://i.getgems.io/pDGb2vCfpeoDKF4YPRmd3aT8TlLttUN-vzzaXYflw94/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUJNY2ZNQVpsTVVyMVczWDhrZEV3M2ZKTVVBYVdINC1YY21FNVI1UmZGSVkwRTIvYzMyMWFlNWEyMGMxOGM1ZQ",
  "BDay Candle": "https://i.getgems.io/n2c56LRueCyZ70qZO9QJcidY9zMMwBjcLvfzZUPYKr8/rs:fill:200:200:1/g:ce/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUN3RUZmVWJiUi0yMmZuM1ZneFVwQmlsN2J3QlFxRUhtN3dnUVliV1k5YzA4WUovOTlmYjJkZjU3NjNmMTlmMg"
};

function wordToDigits(word) {
  return word.toUpperCase().split('').map(ch => letterToDigit[ch] || '?').join('');
}

function digitsToWord(digits) {
  return digits.split('').map(d => digitToLetter[d] || '?').join('');
}

function convert() {
  const input = document.getElementById('input').value.trim();
  const isWord = /^[a-zA-Z]+$/.test(input);
  const result = isWord ? wordToDigits(input) : digitsToWord(input);

  const outputEl = document.getElementById('output');
  outputEl.innerText = result;

  if (result) {
    outputEl.classList.add('show'); // Показываем вывод и добавляем рамку
  } else {
    outputEl.classList.remove('show'); // Прячем вывод и убираем рамку
  }

  const linksDiv = document.getElementById('links');
  const ownerMessage = document.getElementById('owner-message');

  linksDiv.innerHTML = ''; // очищаем плитки

  if (isWord) {
    ownerMessage.classList.add('show'); // показать надпись

    Object.entries(items).forEach(([name, img]) => {
      const link = document.createElement('a');
      link.href = `https://t.me/nft/${name.replace(/\s+/g, '')}-${result}`;
      link.target = '_blank';
      link.className = 'link-card';

      const image = document.createElement('img');
      image.src = img;
      image.alt = name;

      const label = document.createElement('span');
      label.textContent = name;

      link.appendChild(image);
      link.appendChild(label);
      linksDiv.appendChild(link);
    });
  } else {
    ownerMessage.classList.remove('show'); // скрыть надпись
  }
}
// Приветствие пользователя
window.onload = function () {
  const user = Telegram.WebApp.initDataUnsafe?.user;
  if (user) {
    const name = user.username ? `@${user.username}` : user.first_name || 'гость';
    const infoEl = document.getElementById('user-info');
    if (infoEl) {
      infoEl.textContent = `Привет, ${name}`;
    }
  }
};
function showTab(tab) {
  document.querySelectorAll('.tab-page').forEach(el => {
    el.classList.remove('active');
  });

  const target = document.getElementById('tab-' + tab);
  if (target) {
    target.classList.add('active');
    localStorage.setItem('lastTab', tab);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const last = localStorage.getItem('lastTab') || 'decoder';
  showTab(last);
});

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input');
    input.addEventListener('focus', () => {
      setTimeout(() => {
        input.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300); // Ждём пока появится клавиатура
    });
  });

window.addEventListener('resize', () => {
  const nav = document.querySelector('nav');
  if (window.innerHeight < 500) {
    nav.style.display = 'none'; // клавиатура открыта
  } else {
    nav.style.display = 'flex'; // клавиатура скрыта
  }
});
