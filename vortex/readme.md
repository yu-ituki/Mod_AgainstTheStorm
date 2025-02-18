# がいよう
Vortexの拡張機能を誰も作ってなかったので作った。  
ガッツリBepInExのバージョンをロックしてるけどええんかのう、お作法とかようけ分からんわ。  
とりあえず↓のバージョンを持ってきた。  
[BepInEx v5.4.23.2](https://github.com/BepInEx/BepInEx/releases/tag/v5.4.23.2)    

そもそもVortexってなんだよという人は↓。  
https://www.nexusmods.com/about/vortex  

# インストールほうほう
1. Vortexをインストールして
2. AppData\Roaming\Vortex\plugins 以下にgame-againstthestormフォルダをそのまま放り込んで
3. Vortexを起動すると
4. 普通にVortexのGames上に「Against The Storm」という名前で出てくるので
5. それをManagedでいつも通りVortexっぽく使える

# せつめい
なんかようわからんが↓に書いてあった方法で追加した。  
大体コピペだけど、ゲームIDとかをちょろっと書き換えたり、prepareForModding()でBepInExのコピーを走らせたりだけ変えてる。   
https://github.com/Nexus-Mods/Vortex/wiki/MODDINGWIKI-Developers-General-Creating-a-game-extension  

