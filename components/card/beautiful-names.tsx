import React from 'react'
import { AllahName } from '../99names/99names';

export const BeautifulNames = (props: AllahName) => {
    const {name, en, transliteration} = props;
  return (
    <div className="p-4 bg-indigo-100 rounded-lg shadow transition-transform duration-300 hover:scale-105">
                <div dir="rtl" className="text-right">
                    <h2 className="text-lg  font-semibold">{name}</h2>
                </div>
                <div dir="ltr">
                    <p className="text-sm text-rose-600">{transliteration}</p>
                    <p className="text-sm">{en.meaning}</p>
                </div>
              </div>
  )
};
