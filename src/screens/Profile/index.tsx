import { Button, TextInput } from "react-native";
import React from "react";
import { Container, Title } from "./styles";

export function Profile() {
  return (
    <Container>
      <Title testID="text-title">Perfil</Title>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Rodrigo"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Gonçalves"
      />

      <Button title="Salvar" onPress={() => {}} />
    </Container>
  );
}
