import { rest } from 'msw';

export default [
  rest.get('/v1/stories/:storyId', (req, res, ctx) => {
    // /message로 get 요청이 오면
    return res(
      ctx.json({
        comments: {
          data: [
            {
              commentOrder: 0,
              content: 'string',
              createdDateTime: '2022-07-18T15:54:30.026Z',
              deletedDateTime: '2022-07-18T15:54:30.026Z',
              id: 0,
              isSupport: false,
              modifiedDateTime: '2022-07-18T15:54:30.026Z',
              refId: 0,
              supportCount: 0,
              writer: {
                id: 0,
                memberImageUrl: 'string',
                nickname: 'string',
              },
            },
            {
              commentOrder: 1,
              content: 'string',
              createdDateTime: '2022-07-18T15:54:30.026Z',
              deletedDateTime: '2022-07-18T15:54:30.026Z',
              id: 0,
              isSupport: false,
              modifiedDateTime: '2022-07-18T15:54:30.026Z',
              refId: 0,
              supportCount: 0,
              writer: {
                id: 0,
                memberImageUrl: 'string',
                nickname: 'string',
              },
            },
          ],
          page: 0,
          size: 0,
          totalElement: 0,
          totalPage: 0,
        },
        content: 'string',
        createdDateTime: '2022-07-18T15:54:30.026Z',
        id: 0,
        images: [
          {
            imageBinary: 'https://picsum.photos/200',
            name: '0',
          },
          {
            imageBinary: 'https://picsum.photos/201',
            name: '1',
          },
          {
            imageBinary: 'https://picsum.photos/202',
            name: '2',
          },
        ],
        isSupport: false,
        modifiedDateTime: '2022-07-18T15:54:30.026Z',
        plantList: [
          {
            category: 'AQUATIC',
            categoryTitle: 'string',
            createdDateTime: '2022-07-18T15:54:30.026Z',
            fileName: 'string',
            fileUrl: 'https://picsum.photos/202',
            hasImage: false,
            id: 0,
            isVisible: false,
            modifiedDateTime: '2022-07-18T15:54:30.026Z',
            name: 'string',
            nickname: 'string',
          },
          {
            category: 'AQUATIC',
            categoryTitle: 'string',
            createdDateTime: '2022-07-18T15:54:30.026Z',
            fileName: 'string',
            fileUrl: 'https://picsum.photos/202',
            hasImage: false,
            id: 0,
            isVisible: false,
            modifiedDateTime: '2022-07-18T15:54:30.026Z',
            name: 'string',
            nickname: 'string',
          },
          {
            category: 'AQUATIC',
            categoryTitle: 'string',
            createdDateTime: '2022-07-18T15:54:30.026Z',
            fileName: 'string',
            fileUrl: 'https://picsum.photos/203',
            hasImage: false,
            id: 0,
            isVisible: false,
            modifiedDateTime: '2022-07-18T15:54:30.026Z',
            name: 'string',
            nickname: 'string',
          },
          {
            category: 'AQUATIC',
            categoryTitle: 'string',
            createdDateTime: '2022-07-18T15:54:30.026Z',
            fileName: 'string',
            fileUrl: 'https://picsum.photos/204',
            hasImage: false,
            id: 0,
            isVisible: false,
            modifiedDateTime: '2022-07-18T15:54:30.026Z',
            name: 'string',
            nickname: 'string',
          },
          {
            category: 'AQUATIC',
            categoryTitle: 'string',
            createdDateTime: '2022-07-18T15:54:30.026Z',
            fileName: 'string',
            fileUrl: 'https://picsum.photos/205',
            hasImage: false,
            id: 0,
            isVisible: false,
            modifiedDateTime: '2022-07-18T15:54:30.026Z',
            name: 'string',
            nickname: 'string',
          },
        ],
        supportCount: 0,
        writer: {
          id: 1,
          memberImageUrl: 'https://picsum.photos/205',
          nickname: '닉네임표시되냐',
        },
      }),
    );
  }),
];
