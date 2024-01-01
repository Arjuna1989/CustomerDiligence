module model.diligent {

    'use strict';

    export interface Individual {

        DataId: number;

        VersionNum: number;

        FirstName: string;

        SecondName: string;

        ThirdName: string;

        ReferenceNumber: string;

        ListedOn: string;

        Comment: string;

        Designation: string;

        Nationality: string;

        ListType: string;

        LastDayUpdated: string;

        TypeOfBirthDay: string;

        Birthday: string;

        City: string;

        Street: string;

        Country: string;
        
        ListName: string;

        DateOfLastUpdateOfList: string;
    }

    export interface Entity {

        DataId: number;

        VersionNum: number;

        FirstName: string;

        ReferenceNumber: string;

        ListedOn: string;

        Comment: string;

        LastDayUpdated: string;

        ListType: string;

        Street: string;

        City: string;

        Country: string;

        ListName: string;

        DateOfLastUpdateOfList: string;
    }

    export interface CustomerDiligence {
        Q21: boolean
        Q21A: string;

        Q22: boolean
        Q22A: string;

        Q23: boolean
        Q23A: string;

        Q24A: boolean
        Q24AA: string;

        Q24B: boolean
        Q24BA: string;

        Q24C: boolean
        Q24CA: string;

        Q24D: boolean
        Q24DA: string

        Q24E: boolean
        Q24EA: string;

        Q24F: boolean
        Q24FA: string;

        Q24G: boolean
        Q24GA: string;

        Q24H: boolean
        Q24HA: string;

        Q24I: boolean
        Q24IA: string;

        Q24J: boolean
        Q24JA: string;

        Q31A: boolean
        Q31AA: string;

        Q31B: boolean
        Q31BA: string;

        Q32A: boolean
        Q32AA: string;

        Q32B: boolean
        Q32BA: string;

        Q33A: boolean
        Q33AA: string;

        Q33B: boolean
        Q33BA: string;

        Q34A: boolean
        Q34AA: string;

        Q34B: boolean
        Q34BA: string;

        Q35A: boolean
        Q35AA: string;

        Q35B: boolean
        Q35BA: string;

        Q35C: boolean
        Q35CA: string;

        Q36A: boolean
        Q36AA: string;

        Q36B: boolean
        Q36BA: string;

    };
}