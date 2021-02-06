# checkers
A locally hosted two-player checkers game made in JS, HTML, and CSS.

Wireframe: https://wireframe.cc/PRxKLd

User Stories:

1. User can click “New Match” to begin the game
2. The user will be randomly assigned to either the “White” or “Black” pieces.  Their opponent will be assigned to the opposite side.
3. Black always moves first, followed by white.
4. During the user's turn, they can select any of their pieces to move.
5. While the piece is selected, all possible tiles the user can legally move that piece to are highlighted.
6. The user can view a history of all recent moves
7. The user can jump their piece over their opponent’s, capturing it and removing it from the match.  Jumps can be chained together in the same turn.
8. If the user has the opportunity to jump an opponent’s piece, they MUST take it
9. If the user moves a checker into their opponent's back row, that checker is now a King.  It can now move backwards and forwards.
10. The user can select “Resign” during their turn in order to forfeit the match.  At this point an alert will appear stating that the user’s opponent has won after X time with Y pieces remaining.
11. The user can also capture all of their opponents pieces to win the match. The same alert will appear describing the winner
