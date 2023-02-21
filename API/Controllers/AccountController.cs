using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        private readonly SignInManager<AppUser> _signInManager;
        public ILogger<AccountController> Logger { get; }

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService, SignInManager<AppUser> signInManager, ILogger<AccountController> logger)
        {
            Logger = logger;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            //var user = await _userManager.FindByEmailAsync(loginDto.Email);
            var user = await _signInManager.UserManager.FindByEmailAsync(loginDto.Email);

            // var user = await _userManager.Users.Include(p => p.Photos)
            //     .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized();

            //var results = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            var result = await _signInManager.CanSignInAsync(user);


            // var result = await _signInManager.CanSignInAsync(user);



            if (result)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (ModelState.IsValid)
            {

                var isUser = await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email)
                 && await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username);

                if (isUser)
                {
                    ModelState.AddModelError(registerDto.Email, "Email is already taken taken");
                    return ValidationProblem();
                }

                else if (isUser)
                {
                    ModelState.AddModelError(registerDto.Username, "Username is already taken taken");
                    return ValidationProblem();
                }

                var user = new AppUser
                {
                    DisplayName = registerDto.DisplayName,
                    Email = registerDto.Email,
                    UserName = registerDto.Username
                };



                var result = await _userManager.CreateAsync(user, registerDto.Password);

                if (result.Succeeded)
                {
                    await _signInManager.PasswordSignInAsync(user, registerDto.Password, false, false);
                    return CreateUserObject(user);
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return BadRequest(result.Errors);
            }

            return null;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {

            //  var user = await _userManager.Users.Include(p => p == null)
            //     .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

          var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));


            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null, //user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}