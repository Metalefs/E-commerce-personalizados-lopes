import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  state,
  animate,
  keyframes,
} from '@angular/animations';

export let fade = trigger('fadeIn',[
    state('void', style({opacity:0})),

    transition(':enter, :leave', [ //void <=> *
      animate(500)
    ]),
]);

export const slider =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('top') ),
    transition('* => isRight', slideTo('top') ),
    transition('isRight => flip', cardFlipQ() ),
    transition('isRight => *', slideTo('top') ),
    transition('isLeft => *', slideTo('top') )
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        // opacity: '.50',
        [direction]: 0,
        zIndex: 1,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ],optional),
    group([
      query(':leave', [
        animate('1000ms ease', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('1000ms ease', style({ [direction]: '0%'}))
      ],optional)
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}

export const slideInOut =
trigger('slideInOut', [
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('200ms ease-in', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
  ])
])

export const cardFlip =
trigger('cardFlip', [
  state('default', style({
    transform: 'none'
  })),
  state('flipped', style({
    transform: 'rotateY(180deg)'
  })),
  transition('default => flipped', [
    animate('400ms')
  ]),
  transition('flipped => default', [
    animate('200ms')
  ])
])
function cardFlipQ(){
const optional = { optional: true };
return [
  query(':enter, :leave', [
    style({
      transform: 'none',
      position:'absolute',
      top:0
    })
  ], optional),
  query(':enter', [
    style({ transform: 'rotateY(180deg)'})
  ],optional),
  group([
    query(':leave', [
      animate('1000ms ease', style({ transform: 'rotateY(180deg)'}))
    ], optional),
    query(':enter', [
      animate('1000ms ease', style({transform: 'none'}))
    ],optional)
  ]),
];
}
export const sliderSide =
  trigger('routeAnimationsSide', [
    transition('* => *', slideToSide('left') ),
    transition('* => *', slideToSide('right') ),
    transition('* => *', slideToSide('left') ),
    transition('* => *', slideToSide('right') )
  ]);

function slideToSide(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        // opacity: '.50',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ],optional),
    group([
      query(':leave', [
        animate('1350ms ease-in', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('1350ms ease-out', style({ [direction]: '0%'}))
      ],optional)
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
