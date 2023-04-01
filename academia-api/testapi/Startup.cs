using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using testapi.Data;
using testapi.Entities;
using testapi.Models;
using testapi.Services;
using testapi.Services.ChuongService;
using testapi.Services.GiaoVienService;
using testapi.Services.DeThiServices;
using testapi.Services.DeThiCauHoiServices;
using testapi.Services.KiemTraServices;
using testapi.Services.BaiLamServices;
using testapi.Services.UserSevice;
using testapi.Services.MonHocServices;
using testapi.Services.GioHangServices;
using testapi.Services.AdminService;
using testapi.Services.CauHoiServices;
using testapi.Services.MobileServices;
using testapi.Models.AccountViewModels;
using testapi.Services.ThongKeServices;
using testapi.Services.BaiHocServices;

namespace testapi
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.

		public void ConfigureServices(IServiceCollection services)
		{
			
            

            #region Add CORS  
            services.AddCors(options => options.AddPolicy("Cors", builder =>
			{
				builder
				.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader();
			}));
            #endregion
            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(Configuration).CreateLogger();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            //Buoc1
            services.AddAutoMapper(); // Adding automapper
                                      //forgot
            var emailConfig = Configuration
			.GetSection("EmailConfiguration")
			.Get<EmailConfiguration>();
            services.AddSingleton(emailConfig);

            //.....................................

            services.AddDbContext<ApplicationDbContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<dbHocTapContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
				.AddEntityFrameworkStores<ApplicationDbContext>()
                .AddTokenProvider<DataProtectorTokenProvider<ApplicationUser>>(TokenOptions.DefaultProvider);
			//add///////////////////////////
            ;

			services.AddSingleton<IConfiguration>(provider => Configuration);
			//*************************MAIL
			services.AddTransient<IEmailSender, EmailSender>();
            //services.AddScoped<IEmailSender, EmailSender>();
            //*****************************
            services.AddTransient<ITokenService, TokenService>();
			services.AddTransient<IPasswordHasher, PasswordHasher>();
			//*************CẦN KHAI BÁO
            services.AddTransient<IMonHocService, MonHocService>();
            services.AddTransient<IChuongService, ChuongService>();
            services.AddTransient<IGiaoVienService, GiaoVienService>();
            services.AddTransient<IDeThiService, DeThiService>();
            services.AddTransient<IDeThiCauHoiServices, DeThiCauHoiServices>();
            services.AddTransient<IKiemTraService, KiemTraService>();
            services.AddTransient<IBaiLamService, BaiLamService>();
            services.AddTransient<IUserSevice, UserSevice>();
            services.AddTransient<IGioHangService, GioHangService>();
            services.AddTransient<IThongKeService, ThongKeService>();
            services.AddTransient<IAdminService, AdminService>();
            services.AddTransient<ICauHoiService, CauHoiService>();
            services.AddTransient<IMobileService, MobileService>();
            services.AddTransient<IBaiHocService, BaiHocService>();


            services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options =>
			{
				options.RequireHttpsMetadata = false;
				options.SaveToken = true;

				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateAudience = false,
					ValidateIssuer = false,
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"])),
					ValidateLifetime = true,
					ClockSkew = TimeSpan.Zero //the default for this setting is 5 minutes
				};

				options.Events = new JwtBearerEvents
				{
					OnAuthenticationFailed = context =>
					{
						if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
						{
							context.Response.Headers.Add("Token-Expired", "true");
						}
						return Task.CompletedTask;
					}
				};
			});


			
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseHsts();
			}
            loggerFactory.AddSerilog();
			app.UseStaticFiles();
            app.UseCors("Cors");
			app.UseAuthentication();

			app.UseHttpsRedirection();
			app.UseMvc();
		}

	}
}
