import { isEmpty } from 'lodash';

const { isArray } = Array;

const config = {
    search: ['text', 'title'],
    labels: 'labels'
};

export const applyFilters = (filters, notes) => {
    if (isEmpty(filters)) return notes;

    return notes.filter(note =>
      Object.keys(filters)
        .reduce((acc, key) =>
          acc && (
              isArray(config[key]) ? (
                config[key].reduce((res, currentKey) =>
                    res || note[currentKey]
                      .toLocaleLowerCase()
                      .indexOf(filters[key]) !== -1,
                  false)
              ) : (
                    note[config[key]].indexOf(filters[key]) !== -1
              )
            ),
            true)
    );
};

export const colors = [
  '#ffffff',
  '#ff8a80',
  '#ffd180',
  '#ffff8d',
  '#ccff90',
  '#a7ffeb',
  '#80d8ff',
  '#82b1ff',
  '#f8bbd0'
];