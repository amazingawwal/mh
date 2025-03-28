import {defineField, defineType} from 'sanity'


export const audioFile = defineType({
    name: 'lecture',
    title: 'Lecture',
    type: 'file',
    fields: [
        {
          name: "title",
          title: "Title",
          type: "string"
        },
        {
          name: "description",
          title: "Description",
          type: "text"
        },
        {
          name: "duration",
          title: "Duration (in seconds)",
          type: "number"
        }
      ]
})

export const audioType = defineType({
  name: 'audio',
  title: 'Audio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
        name: 'slug',
        type: 'slug',
        options: {
            source: 'title',
          },
        validation: (rule)=> rule.required().warning('Please ensure this field has value to generate working url'),
        hidden: ({document})=>!document?.title
      }),
      defineField({
        name: 'date',
        type: 'datetime'
      }),
      defineField({
        name: 'download',
        type: 'url'
      }),
      defineField({
        name: 'reciters',
        type: 'array',
        of: [{type: 'block'}]
      }),
      defineField({
        name: 'audio_type',
        type: 'string',
        options: {
            list: ['Story of the Prophet Muhammed (PBUH)', 'Story of other Prophets'],
            layout: 'dropdown'
        }
      }),
      defineField({
        name: 'audio',
        type: 'file',
        options: {
            accept: 'audio/*'
        }
        // type: 'reference',
        // to: [{
        //     type:'lecture'
        // }]
      }),
  ],
})