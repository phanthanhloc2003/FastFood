import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { User } from 'src/common/decorators/public-router.decorator';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('address')
@UseGuards(AuthGuard('jwt'))
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  create(@User() user: IUserNoPassWord, @Body() body: CreateAddressDto) {
    return this.addressService.create(user.email, body);
  }

  @Get()
  findAll(@User() user: IUserNoPassWord) {
    return this.addressService.findAll(user.email);
  }

  @Get(':id')
  findOne(@User() user: IUserNoPassWord, @Param('id') id: string) {
    return this.addressService.findOne(user.email, +id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @User() user: IUserNoPassWord,
    @Param('id') id: string,
    @Body() body: CreateAddressDto,
  ) {
    return this.addressService.update(user.email, +id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@User() user: IUserNoPassWord, @Param('id') id: string) {
    return this.addressService.remove(user.email, +id);
  }

  @Put(':id/default')
  setDefault(@User() user: IUserNoPassWord, @Param('id') id: string) {
    return this.addressService.setDefault(user.email, +id);
  }
}
