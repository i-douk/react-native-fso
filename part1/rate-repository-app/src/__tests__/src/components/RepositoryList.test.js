import React from 'react';
import { render, screen } from '@testing-library/react-native';
import {RepositoryListContainer} from '../../../components/RepositoryList';
import { abbrev } from '../../../components/RepositoryItem';
describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = [
        {
          node: {
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
        },
        {
          node: {
            id: 'async-library.react-async',
            fullName: 'async-library/react-async',
            description: 'Flexible promise-based React data loader',
            language: 'JavaScript',
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
          },
        },
      ];

      render(<RepositoryListContainer repositories={repositories} />);

      screen.debug(); 

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(2);

      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(firstRepositoryItem).toHaveTextContent('jaredpalmer/formik');
      expect(firstRepositoryItem).toHaveTextContent('Build forms in React, without the tears');
      expect(firstRepositoryItem).toHaveTextContent('TypeScript');
      expect(firstRepositoryItem).toHaveTextContent(abbrev('1619'));
      expect(firstRepositoryItem).toHaveTextContent(abbrev('21856'));
      expect(firstRepositoryItem).toHaveTextContent(abbrev('88'));
      expect(firstRepositoryItem).toHaveTextContent(abbrev('3'));

      expect(secondRepositoryItem).toHaveTextContent('async-library/react-async');
      expect(secondRepositoryItem).toHaveTextContent('Flexible promise-based React data loader');
      expect(secondRepositoryItem).toHaveTextContent('JavaScript');
      expect(secondRepositoryItem).toHaveTextContent(abbrev('69'));
      expect(secondRepositoryItem).toHaveTextContent(abbrev('1760'));
      expect(secondRepositoryItem).toHaveTextContent(abbrev('72'));
      expect(secondRepositoryItem).toHaveTextContent(abbrev('3'));
    });
  });
});
