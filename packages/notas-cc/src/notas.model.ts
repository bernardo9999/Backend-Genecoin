import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core';

export class NotasTransientInput extends ConvectorModel<NotasTransientInput> {
  @ReadOnly()
  @Required()
  public readonly type = 'notaTransientInput';

 
  @Validate(yup.string())
  cod_prod: string;

  @Validate(yup.string())
  date: string;
 
  @Validate(yup.object())
  nota: {};
}

export class NotasPrivate extends ConvectorModel<NotasPrivate> {
  @ReadOnly()
  @Required()
  public readonly type = 'nota';

  @Validate(yup.string())
  cod_prod: string;
 
 @Validate(yup.string())
  date: string;
 
  @Validate(yup.object())
  nota: {};
}
 export class NotasPublic extends ConvectorModel<NotasPublic> {

  @ReadOnly()
    @Required()
    public readonly type = 'nota';

   @Validate(yup.string())
    date: string;
    
    @Validate(yup.string())
    org: string;
}