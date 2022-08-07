import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /**
   JWT onaylandiktan sonra burasi calisiyor
   ama nasil kendisi onayliyor anlayamiyorum
   aslinda soyle onayliyor onaylamasini istegimiz Requestlerin basina annotation olarak @UseGuards(AuthGuard())
   ile ekliyorum ve kendisi header'daki jwt tokeni  benim olusturdugum secret keye gore onayliyor
   onaylayinca da validate fonksiyonu calisiyor onun nasil tetiklendigini anlamadim
   */
  async validate(payload: JwtPayloadInterface): Promise<UserEntity> {
    const { username } = payload;
    const user = await this.userEntityRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
