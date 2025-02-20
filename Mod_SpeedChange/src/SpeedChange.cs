using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Eremite.Services;
using HarmonyLib;
using UnityEngine;

namespace Mod
{
	[HarmonyPatch]
	class SpeedChange
	{
		[HarmonyPatch(typeof(TimeScaleService), "SelfUpdate")]
		[HarmonyPostfix]
		static void _Postfix_TimeScaleService_SelfUpdate( TimeScaleService __instance ) {
			
			var config = Plugin.Instance.ModConfig;
			if (config.Key_Spd5.IsPress()) 
				__instance.Change(5.0f, true);
			if (config.Key_Spd10.IsPress())
				__instance.Change(10.0f, true);
			if (config.Key_Spd20.IsPress())
				__instance.Change(20.0f, true);
			if (config.Key_Spd50.IsPress())
				__instance.Change(50.0f, true);
		}

	}
}
