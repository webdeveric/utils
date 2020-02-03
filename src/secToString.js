export default function secToString( time )
{
  const secTime = {
    century: 3.1556926 * Math.pow(10, 9),
    decade: 315569260,
    year: 31556926,
    month: 2629743.83,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  let str = '';

  for ( const [ units, seconds ] of Object.entries( secTime ) ) {
    if ( seconds > time ) {
      continue;
    }

    const currentValue = Math.floor( time / seconds );

    const suffix = currentValue === 1 ? units : `${units}s`;

    str = `${str} ${currentValue} ${suffix}`;

    time %= seconds;
  }

  return str.replace('centurys', 'centuries').trim();
}
