using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mod
{
	public abstract class ModConfigBase
	{
		public virtual void Initialize(BepInEx.Configuration.ConfigFile config) { }
	}
}
