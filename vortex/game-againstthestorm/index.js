//-----------------------------------.
//定数.
//-----------------------------------.
// ゲームの Nexus Mods ドメイン。例: nexusmods.com/bloodstainedritualofthenight 
const GAME_ID = 'againstthestorm'; 
//Steam アプリケーション ID。https://steamdb.info/apps/ から取得できます。
const STEAMAPP_ID = '1336490'; 
//GOG アプリケーション ID。https://www.gogdb.org/ から取得できます。
const GOGAPP_ID = '1460447406';
// 拡張機能の表示名.
const VIEW_NAME = 'Against The Storm';

//-----------------------------------.
// 以下処理.
//-----------------------------------.

// Imports.
path = require('path'); 
const { log, util } = require('vortex-api'); 
const winapi = require('winapi-bindings'); 
const fs = require('fs-extra');

//---.
// ゲーム検索.
//---.
function findGame() { 
  try { 
    const instPath = winapi.RegGetValue( 
      'HKEY_LOCAL_MACHINE', 
      'SOFTWARE\\WOW6432Node\\GOG.com\\Games\\' + GOGAPP_ID, 
      'PATH'); 
    if (!instPath) { 
      throw new Error('empty registry key'); 
    } 
    return Promise.resolve(instPath.value); 
  } catch (err) { 
    return util.GameStoreHelper.findByAppId([STEAMAPP_ID, GOGAPP_ID]) 
      .then(game => game.gamePath); 
  } 
}

//---.
// Mod環境のセットアップ.
// BepInExフォルダの用意.
//---.
async function prepareForModding(discovery, api) {
  //return fs.ensureDirWritableAsync(path.join(discovery.path, 'BepInEx', 'plugins'));
  const targetPath = path.join(discovery.path, 'BepInEx');
  const sourcePath = path.join(__dirname,'BepInEx');
  
  try {
      // BepInEx フォルダが存在しない場合にコピー
      if (!(fs.existsSync(targetPath))) {
          return fs.copy(sourcePath, targetPath);
        } else {
          console.log('BepInEx フォルダは既に存在します。');
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

//-----
// Modがサポートされているかチェック.
//-----
function testSupportedContent(files, gameId) { 
  supported = (gameId === GAME_ID);
  return Promise.resolve({ 
    supported, 
    requiredFiles: [], 
  }); 
}

//-----
// Modをインストール.
//-----
function installContent(files) { 
  /*
  const rootPath = path.dirname(files[0]); 
  const filtered = files.filter(file => file.indexOf(rootPath) !== -1); 
  const instructions = filtered.map(file => { 
    return { 
      type: 'copy', 
      source: file, 
      destination: path.join(rootPath, file), 
    }; 
  }); 

  return Promise.resolve({ instructions }); 
  */
 const modFile = files[0];
 const idx = modFile.indexOf(path.basename(modFile));
 const rootPath = path.dirname(modFile);
 
 // Remove directories and anything that isn't in the rootPath.
 const filtered = files.filter(file => 
   ((file.indexOf(rootPath) !== -1) 
   && (!file.endsWith(path.sep))));

 const instructions = filtered.map(file => {
   return {
     type: 'copy',
     source: file,
     destination: path.join(file.substr(idx)),
   };
 });

 return Promise.resolve({ instructions });
}

//-----
// Main関数.
//-----
function main(context) { 
	//これは、ゲーム拡張機能を検出したときにVortexが実行するメイン関数です.
	context.registerGame({ 
        id: GAME_ID, 
        name: VIEW_NAME, 
        mergeMods: true, 
        queryPath: findGame, 
        supportedTools: [], 
        queryModPath: () => 'BepInEx/plugins', 
        logo: 'gameart.jpg', 
        executable: () => 'Against the Storm.exe', 
        requiredFiles: [ 
          'Against the Storm.exe', 
        ], 
        setup: prepareForModding, 
        environment: { 
          SteamAPPId: STEAMAPP_ID, 
        }, 
        details: { 
          steamAppId: STEAMAPP_ID, 
          gogAppId: GOGAPP_ID, 
        }, 
      });
  
  context.registerInstaller('againstthestorm-mod', 25, testSupportedContent, installContent);
	return true 
} 

module.exports = { 
    default: main, 
  };