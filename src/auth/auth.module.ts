import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { UserModule } from "../user/user.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthService, AuthResolver, LocalStrategy]
})
export class AuthModule {
}
