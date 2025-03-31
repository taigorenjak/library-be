import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Če želiš dodati kakršne koli dodatne logike, to lahko storiš tukaj.
}