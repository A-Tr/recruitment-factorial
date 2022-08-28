import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { inject, injectable } from 'tsyringe';
import { LoginRequest } from './model/Session';
import { UsersService } from './UsersService';

@injectable()
@Route('users')
@Tags('Users')
export class UsersController extends Controller {
  constructor(@inject(UsersService) private service: UsersService) {
    super();
  }
  
  /**
   * Retrieves a user token by email and password
   */
  @Post('login')
  async login(@Body() payload: LoginRequest) {
    return this.service.login(payload.email, payload.password);
  }

  /**
   * Creates a new user in database with the provided email and password
   */
   @Post('signup')
   @SuccessResponse("201", "Created")
   async signup(@Body() payload: LoginRequest) {
     return this.service.signup(payload.email, payload.password);
   }
}
