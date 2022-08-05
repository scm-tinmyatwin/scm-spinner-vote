import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {

    transform(userList: any[], groupList: any[]): any[] {

        // return empty array if array is falsy
        if (!userList || !groupList) {
            return userList
        }

        return userList.filter(user => {
            return groupList.some(group => {
                return group.name === user.group && group.selected;
            });
        });
    }
}