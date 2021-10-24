export enum Seconds {
  Second = 1,
  Minute = 60 * Second,
  Hour = 60 * Minute,
  Day = 24 * Hour,
  Week = 7 * Day,
  Month = (365.25 / 12) * Day,
  Year = 12 * Month,
  Decade = 10 * Year,
  Century = 10 * Decade,
  Millennium = 10 * Century,
}

type SecondsTuple = [key: Lowercase<keyof typeof Seconds>, seconds: Seconds];

export function secToString(time: number, joinString = ' '): string {
  const secTime: SecondsTuple[] = [
    [ 'millennium', Seconds.Millennium ],
    [ 'century', Seconds.Century ],
    [ 'decade', Seconds.Decade ],
    [ 'year', Seconds.Year ],
    [ 'month', Seconds.Month ],
    [ 'week', Seconds.Week ],
    [ 'day', Seconds.Day ],
    [ 'hour', Seconds.Hour ],
    [ 'minute', Seconds.Minute ],
    [ 'second', Seconds.Second ],
  ];

  const parts = secTime.reduce<string[]>(
    (output, [ units, seconds ]) => {
      if (seconds <= time) {
        const currentValue = Math.floor(time / seconds);
        const suffix = currentValue === 1 ? units : `${units}s`;

        time %= seconds;

        output.push(`${currentValue} ${suffix}`);
      }

      return output;
    },
    [],
  );

  // cSpell:ignore centurys
  return parts.join(joinString).replace('centurys', 'centuries');
}
