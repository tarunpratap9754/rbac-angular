export class Country{
    _id?: String;
    CountryName: String;
    States: [{
        StateName: String;
        Cities: [{
            type: String;
        }]
    }]
}