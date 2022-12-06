'use strict'

var gTrans = {
    title: {
        en: 'Book inventory',
        he: 'ספרים – ניהול מלאי'
    },
    'create-book': {
        en: 'Create new book',
        he: 'צור ספר חדש',
    },
    'sort-header': {
        en: 'Sort by:',
        he: ':סנן לפי',
    },
    'sort-price': {
        en: 'Max price',
        he: 'מחיר מקסימלי'
    },
    'sort-rate': {
        en: 'Min rate',
        he: 'דירוג מינימלי',
    },
    'table-id': {
        en: 'Id',
        he: 'קוד זיהוי',
    },
    'table-name': {
        en: 'Title',
        he: 'שם הספר',
    },
    'table-price': {
        en: 'Price',
        he: 'מחיר',
    },
    'table-actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'next-page': {
        en: 'Next page',
        he: 'הבא',
    },
    'prev-page': {
        en: 'Previous page',
        he: 'חזור',
    },
    'read-btn': {
        en: 'Read',
        he: 'קרא',
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן',
    },
    'del-btn': {
        en: 'Delete',
        he: 'מחק',
    },
    'search-placeholder': {
        en: 'Search...',
        he: 'חפש...'
    },
    'modal-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'modal-desc': {
        en: 'Book Description',
        he: 'תיאור הספר'
    },
    'modal-rate': {
        en: 'Rate the Book (0-10)',
        he: 'דרג את הספר (0-10)'
    }
}

var gCurrLang = 'en'

function getTrans(transKey) {
    // done: if key is unknown return 'UNKNOWN'
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // done: get from gTrans
    var translation = key[gCurrLang]

    // done: If translation not found - use english
    if (!translation) translation = key.en

    return translation
}

function doTrans() {
    // done: 
    // var els = document.querySelectorAll('[data-trans]'
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)

        el.innerText = translation

        // done: support placeholder    
        if (el.placeholder) el.placeholder = translation
    })
}

function setLang(lang) {
    gCurrLang = lang
}
