using BepInEx.Configuration;

using System.Collections.Generic;

using UnityEngine;
using UnityEngine.InputSystem;

namespace Mod
{
	/// <summary>
	/// Modコンフィグ用.
	/// </summary>
	public class ModConfig : ModConfigBase
	{

		public KeyConfigData Key_Spd5 { get; set; }

		public KeyConfigData Key_Spd10 { get; set; }
		public KeyConfigData Key_Spd20 { get; set; }
		public KeyConfigData Key_Spd50 { get; set; }


		public override void Initialize( ConfigFile config )
		{
			Key_Spd5 = KeyConfigData.Create(config, Key.Digit5, "Key_Spd5", "key:speed change x5");
			Key_Spd10 = KeyConfigData.Create(config, Key.Digit6, "Key_Spd10", "key:speed change x10");
			Key_Spd20 = KeyConfigData.Create(config, Key.Digit7, "Key_Spd20", "key:speed change x20");
			Key_Spd50 = KeyConfigData.Create(config, Key.Digit8, "Key_Spd50", "key:speed change x50");
		}
	}
}
