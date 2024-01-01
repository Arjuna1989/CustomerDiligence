using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(CommercePromote.CustomerDiligenceClient.StartUp))]
namespace CommercePromote.CustomerDiligenceClient
{
    public partial class StartUp
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}