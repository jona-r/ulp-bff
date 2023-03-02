import { Module } from '@nestjs/common';
import { SSOController } from './sso.controller';
import { SSOService } from './sso.services';
//keycloak integration
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'https://ulp.uniteframework.io/auth',
      realm: 'sunbird-rc',
      clientId: 'ulp-user',
      secret: '2630e6f7-4a40-4eb3-ad8b-f23a72114fa8',
      // Secret key of the client taken from keycloak server
    }),
  ],
  controllers: [SSOController],
  providers: [
    SSOService,
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    /*{
      provide: APP_GUARD,
      useClass: AuthGuard,
    },*/
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and
    // methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class SSOModule {}