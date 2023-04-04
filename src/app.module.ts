import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
    controllers: [],
    // provider can be used as any reused component like server with logic
    providers: [],
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'nest_course',
            models: [],
            autoLoadModels: true
          }),
    ]
})

export class AppModule {}
